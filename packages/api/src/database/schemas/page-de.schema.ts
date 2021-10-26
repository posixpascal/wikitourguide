import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Page } from './page.schema';

export type PageDeDocument = PageDe & Document;

@Schema({ collection: 'pages_de' })
export class PageDe extends Page {
  @Prop()
  title: string;

  @Prop()
  pageID: string;

  @Prop({ type: JSON })
  coordinates: any;
}

export const PageDeSchema = SchemaFactory.createForClass(PageDe);
