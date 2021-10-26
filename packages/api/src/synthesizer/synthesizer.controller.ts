import { Controller, Get, Param, Query } from '@nestjs/common';
import { SynthesizerService } from './synthesizer.service';
import { InjectModel } from '@nestjs/mongoose';
import { PageDe, PageDeDocument } from '../database/schemas/page-de.schema';
import { Model } from 'mongoose';
import { PageEn, PageEnDocument } from '../database/schemas/page-en.schema';
import {
  SynthArticle,
  SynthArticleDocument,
} from '../database/schemas/synth-article.schema';

@Controller('synthesizer')
export class SynthesizerController {
  constructor(
    private synthesizerService: SynthesizerService,
    @InjectModel(PageDe.name) private pagesDeModel: Model<PageDeDocument>,
    @InjectModel(PageEn.name) private pagesEnModel: Model<PageEnDocument>,
    @InjectModel(SynthArticle.name)
    private synthArticleModel: Model<SynthArticleDocument>,
  ) {}

  @Get('/:pageID')
  async synthArticle(
    @Param('pageID') pageID: string,
    @Query('lang') lang: any = 'de',
    @Query('voice') voice,
  ) {
    const article = await this.synthArticleModel
      .findOne({ pageID, lang, voice })
      .exec();
    if (!article) {
      return this.synthesizerService.create({
        pageID,
        lang,
        voice,
      });
    }

    return article;
  }
}
