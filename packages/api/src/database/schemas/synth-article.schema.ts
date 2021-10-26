import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SynthArticleDocument = SynthArticle & Document;

@Schema({ collection: 'synth_articles' })
export class SynthArticle {
  @Prop()
  pageID: string;

  @Prop()
  title: string;

  @Prop()
  lang: string;

  @Prop({ type: JSON })
  segments: any;

  @Prop()
  voice: string;

  @Prop()
  ssmlCost: number;

  @Prop({ type: Date, default: () => +new Date() })
  createdAt: any;
}

export const SynthArticleSchema = SchemaFactory.createForClass(SynthArticle);
