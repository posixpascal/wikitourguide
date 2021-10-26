import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PageDe, PageDeDocument } from '../database/schemas/page-de.schema';
import { Model } from 'mongoose';
import { PageEn, PageEnDocument } from '../database/schemas/page-en.schema';
import {
  PageQueue,
  PageQueueDocument,
} from '../database/schemas/page-queue.schema';
import { WikipediaService } from '../wikipedia/wikipedia.service';
import { DEFAULT_RADIUS, SUPPORTED_LANGUAGES } from '../runtime.config';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CrawlerService {
  readonly #logger = new Logger(CrawlerService.name);

  constructor(
    @InjectModel(PageDe.name)
    private readonly pagesDeModel: Model<PageDeDocument>,
    @InjectModel(PageEn.name)
    private readonly pagesEnModel: Model<PageEnDocument>,
    @InjectModel(PageQueue.name)
    private readonly pageQueueModel: Model<PageQueueDocument>,
    private wikipediaService: WikipediaService,
  ) {}

  async queueSize() {
    return this.pageQueueModel
      .find({
        hasProcessed: false,
      })
      .count();
  }

  // Grab 10 new POIs to discover unless there are already > 50 in queue.
  @Cron('1/10 * * * *')
  async discoverNearby() {
    const MAX_QUEUE_SIZE = 10;

    this.#logger.log('Discovering new POIs from existing WikiPedia articles');

    const pagesInQueue = await this.pageQueueModel
      .find({
        hasProcessed: false,
      })
      .count();

    if (pagesInQueue >= MAX_QUEUE_SIZE) {
      return;
    }

    for await (const lang of SUPPORTED_LANGUAGES) {
      // Dynamically resolve pageModel from language
      const capitalizedAlpha2Code = `${lang[0].toUpperCase()}${lang[1]}`;
      const pageModel: Model<PageDeDocument> | Model<PageEnDocument> =
        this[`pages${capitalizedAlpha2Code}Model`];

      const randomArticles = await pageModel
        .aggregate([
          {
            $sample: { size: MAX_QUEUE_SIZE },
          },
        ])
        .exec();

      for await (const randomArticle of randomArticles) {
        const [lon, lat] = randomArticle.location.coordinates;
        const existingLocation = await this.pageQueueModel
          .findOne(
            {
              location: {
                $all: [lat, lon],
              },
            },
            {
              limit: 1,
            },
          )
          .exec();

        if (existingLocation) {
          continue;
        }

        const newQueueEntry = new this.pageQueueModel();
        newQueueEntry.location = [lat, lon];
        newQueueEntry.hasProcessed = false;
        await newQueueEntry.save();

        this.#logger.log(
          `Discovered POI for ${lang} at (${lat}, ${lon}). Near ${randomArticle.title}`,
        );
      }
    }
  }

  @Cron('1/10 * * * *')
  async fetchArticles() {
    this.#logger.log('Discovering new articles from WikiPedia');
    const locations = await this.pageQueueModel
      .aggregate([
        { $match: { hasProcessed: false } },
        {
          $sample: { size: 10 },
        },
      ])
      .limit(10)
      .exec();

    for await (const locationModel of locations) {
      const { location } = locationModel;

      try {
        for await (const lang of SUPPORTED_LANGUAGES) {
          const [lat, lon] = location;
          const articles = await this.wikipediaService.findNearByFromAPI(
            lat,
            lon,
            {
              lang,
              radius: DEFAULT_RADIUS,
            },
          );

          if (!articles) {
            continue;
          }

          try {
            for await (const article of articles) {
              // Dynamically resolve pageModel from language
              const capitalizedAlpha2Code = `${lang[0].toUpperCase()}${
                lang[1]
              }`;
              const pageModel: Model<PageDeDocument> | Model<PageEnDocument> =
                this[`pages${capitalizedAlpha2Code}Model`];

              if (!pageModel) {
                throw new Error(
                  `Mongoose Page Model for language ${lang} is missing. Please add a page-${lang}.schema.ts file.`,
                );
              }

              let page = await pageModel
                .findOne({ title: article.title })
                .exec();
              if (!page) {
                page = new pageModel();
              }

              // mirror article properties to new page model
              for (const property in article) {
                if (!article.hasOwnProperty(property)) {
                  continue;
                }

                page[property] = article[property];
              }

              try {
                await page.save();
                this.#logger.log(
                  `Updated article {${article.title}} for language {${lang}}`,
                );
              } catch (e) {
                this.#logger.warn(
                  `Failed to update article {${article.title}} for language {${lang}}`,
                );
              }
            }
          } catch (e) {
            this.#logger.error(e);
            this.#logger.error(articles);
          }
        }
      } catch (ex) {
        this.#logger.error(ex);
      }

      // Mark locations as processed.
      await this.pageQueueModel.deleteOne({
        id: locationModel.id,
      });
      this.#logger.log(
        'Task executed successfully for latlng: ' + location.join(', '),
      );
    }
  }
}
