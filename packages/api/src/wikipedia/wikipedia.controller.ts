import { Controller, Get, Param, Query } from '@nestjs/common';
import wiki from 'wikijs';
import { WikipediaService } from './wikipedia.service';

const textToSpeech = require('@google-cloud/text-to-speech');

@Controller('wikipedia')
export class WikipediaController {
  public client;

  constructor(private wikipediaService: WikipediaService) {
    this.client = new textToSpeech.TextToSpeechClient();
  }

  @Get('/coords')
  async byCoords(
    @Query() params,
    @Query('lang') lang = 'de',
    @Query('limit') limit: string = '20',
  ) {
    const { lat, lng } = params;
    return await this.wikipediaService.findNearBy(lat, lng, {
      maxDistance: 15000,
      limit: parseInt(limit),
    });
  }

  @Get('/:id')
  async view(@Param('id') id, @Query('lang') lang = 'de') {
    return await this.wikipediaService.findByPageID(id, lang);
  }
}
