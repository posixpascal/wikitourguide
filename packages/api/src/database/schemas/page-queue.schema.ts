import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageQueueDocument = PageQueue & Document;

@Schema({ collection: 'page_queue' })
export class PageQueue {
  @Prop()
  hasProcessed: boolean;

  @Prop({ type: JSON })
  location: any;
}

export const PageQueueSchema = SchemaFactory.createForClass(PageQueue);
