import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  if (process.env.NODE_ENV !== 'production') {
    app.setGlobalPrefix('api');
    app.enableCors({
      origin: '*',
    });
  }

  await app.listen(3000);
}

bootstrap();
