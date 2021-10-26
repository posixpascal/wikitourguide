import { Module } from '@nestjs/common';
import { SynthesizerService } from './synthesizer.service';
import { SynthesizerController } from './synthesizer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PageDe, PageDeSchema } from '../database/schemas/page-de.schema';
import { PageEn, PageEnSchema } from '../database/schemas/page-en.schema';
import {
  PageQueue,
  PageQueueSchema,
} from '../database/schemas/page-queue.schema';
import {
  SynthArticle,
  SynthArticleSchema,
} from '../database/schemas/synth-article.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: PageDe.name, schema: PageDeSchema },
      { name: PageEn.name, schema: PageEnSchema },
      { name: PageQueue.name, schema: PageQueueSchema },
      { name: SynthArticle.name, schema: SynthArticleSchema },
    ]),
  ],
  providers: [
    SynthesizerService,
    {
      provide: 'S3Client',
      useFactory: async (configService: ConfigService) => {
        console.log(configService);
        const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
        return new AWS.S3({
          endpoint: spacesEndpoint,
          accessKeyId: configService.get('SPACES_ACCESS_KEY_ID'),
          secretAccessKey: configService.get('SPACES_ACCESS_KEY_SECRET'),
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [SynthesizerController],
})
export class SynthesizerModule {}
