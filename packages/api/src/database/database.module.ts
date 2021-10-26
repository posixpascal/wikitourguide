import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PageDe, PageDeSchema } from './schemas/page-de.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: PageDe.name, schema: PageDeSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URL'),
          dbName: 'wikitourguide',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
