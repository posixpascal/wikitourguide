import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Page } from './page.schema';

export type PageEnDocument = PageEn & Document;

@Schema({ collection: 'pages_en' })
export class PageEn extends Page {}

export const PageEnSchema = SchemaFactory.createForClass(PageEn);
