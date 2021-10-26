import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageDe, PageDeDocument } from '../database/schemas/page-de.schema';
import { PageEn, PageEnDocument } from '../database/schemas/page-en.schema';
import { Page } from '../database/schemas/page';
import {
  SynthArticle,
  SynthArticleDocument,
} from '../database/schemas/synth-article.schema';
import {
  PageQueue,
  PageQueueDocument,
} from '../database/schemas/page-queue.schema';
import {
  WikiApiFetchNearByArticlesOptions,
  wikipediaAPI,
} from './wikipedia.api';
import { SECTION_BLACKLIST } from '../runtime.config';

@Injectable()
export class WikipediaService {
  constructor(
    @InjectModel(PageDe.name) private pagesDeModel: Model<PageDeDocument>,
    @InjectModel(PageEn.name) private pagesEnModel: Model<PageEnDocument>,
    @InjectModel(SynthArticle.name)
    private synthArticleModel: Model<SynthArticleDocument>,
    @InjectModel(PageQueue.name)
    private pageQueueModel: Model<PageQueueDocument>,
  ) {}

  async findAll(): Promise<Page[]> {
    return this.pagesDeModel.find().exec();
  }

  async findByPageID(pageID, lang): Promise<Page> {
    const model = lang === 'de' ? this.pagesDeModel : this.pagesEnModel;
    return model
      .findOne({
        pageID,
      })
      .exec();
  }

  // Queue a new location to be enhanced by querying the wikipedia api.
  async queueLocation(lat, lon): Promise<void> {
    const queue = new this.pageQueueModel();
    queue.location = [lat, lon];
    queue.hasProcessed = false;
    await queue.save();
  }

  async findNearBy(
    lat,
    lon,
    options = { limit: 100, maxDistance: 5000 },
  ): Promise<Page[]> {
    await this.queueLocation(lat, lon);
    return await this.pagesDeModel
      .aggregate([
        {
          $geoNear: {
            near: {
              type: 'Point',
              coordinates: [parseFloat(lon), parseFloat(lat)],
            },
            spherical: true,
            distanceField: 'distance',
            maxDistance: options.maxDistance,
          },
        },
        {
          $sort: { distance: 1 },
        },
      ])
      .limit(options.limit)
      .exec();
  }

  // Fetch articles from API and transform them to mongoDB upsert-models.
  async findNearByFromAPI(
    lat,
    lon,
    options: WikiApiFetchNearByArticlesOptions,
  ) {
    const articles = await wikipediaAPI.fetchNearByArticles(lat, lon, options);

    // Prepared mongoDB upserts
    return await Promise.all(
      articles.map(async (article) => {
        const articleCoordinates = await article.coordinates();
        return {
          title: article.raw.title,
          isDisambiguation: false,
          isRedirect: false,
          url: article.url(),
          templates: [],
          infoboxes: [],
          summary: await article.summary(),
          fullInfo: await article.fullInfo(),
          images: await article.images(),
          categories: await article.categories(),
          sections: ((await article.content()) as any)
            .filter((s) => {
              return !SECTION_BLACKLIST.includes(s.title.toLowerCase());
            })
            .filter((s) => s.title && s.content)
            .map((content) => {
              return {
                title: content.title,
                text: content.content,
              };
            }),
          hasCoordinates: true,
          coordinates: [],
          location: {
            type: 'Point',
            coordinates: [articleCoordinates.lon, articleCoordinates.lat],
          },
          pageID: String(article.raw.pageid),
          origin: 'wikipedia/api',
        };
      }),
    );
  }
}
