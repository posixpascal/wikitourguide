import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PageDe, PageDeSchema } from '../database/schemas/page-de.schema';
import { PageEn, PageEnSchema } from '../database/schemas/page-en.schema';
import {
  PageQueue,
  PageQueueSchema,
} from '../database/schemas/page-queue.schema';
import { WikipediaModule } from '../wikipedia/wikipedia.module';
import { WikipediaService } from '../wikipedia/wikipedia.service';
import { SynthesizerModule } from '../synthesizer/synthesizer.module';
import {
  SynthArticle,
  SynthArticleSchema,
} from '../database/schemas/synth-article.schema';
import { CrawlerController } from './crawler.controller';

@Module({
  imports: [
    SynthesizerModule,
    WikipediaModule,
    MongooseModule.forFeature([
      { name: PageDe.name, schema: PageDeSchema },
      { name: PageEn.name, schema: PageEnSchema },
      { name: PageQueue.name, schema: PageQueueSchema },
      { name: SynthArticle.name, schema: SynthArticleSchema },
    ]),
  ],
  providers: [CrawlerService, WikipediaService],
  controllers: [CrawlerController],
})
export class CrawlerModule {}
