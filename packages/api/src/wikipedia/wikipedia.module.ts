import { Module } from '@nestjs/common';
import { WikipediaController } from './wikipedia.controller';
import { WikipediaService } from './wikipedia.service';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PageDe, PageDeSchema } from '../database/schemas/page-de.schema';
import { PageEn, PageEnSchema } from '../database/schemas/page-en.schema';
import {
  SynthArticle,
  SynthArticleSchema,
} from '../database/schemas/synth-article.schema';
import {
  PageQueue,
  PageQueueSchema,
} from '../database/schemas/page-queue.schema';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: PageDe.name, schema: PageDeSchema },
      { name: PageEn.name, schema: PageEnSchema },
      { name: SynthArticle.name, schema: SynthArticleSchema },
      { name: PageQueue.name, schema: PageQueueSchema },
    ]),
  ],
  controllers: [WikipediaController],
  providers: [WikipediaService],
})
export class WikipediaModule {}
