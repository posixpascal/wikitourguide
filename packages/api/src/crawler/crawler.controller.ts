import { Controller, Get } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Controller('crawler')
export class CrawlerController {
  constructor(private crawlerService: CrawlerService) {}

  @Get('/status')
  async status() {
    return {
      queueSize: await this.crawlerService.queueSize(),
    };
  }
}
