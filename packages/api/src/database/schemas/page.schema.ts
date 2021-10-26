import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Page {
  @Prop()
  title: string;

  @Prop()
  isDisambiguation: boolean;

  @Prop()
  isRedirect: boolean;

  @Prop()
  url: string;

  @Prop({ type: JSON })
  voiceDurations: any;

  @Prop()
  pageID: string;

  @Prop({ type: JSON })
  coordinates: any;

  @Prop({ type: JSON })
  infoboxes: any;

  @Prop({ type: JSON })
  summary: any;

  @Prop({ type: JSON })
  sections: any;

  @Prop({ type: JSON })
  templates: any;

  @Prop({ type: Boolean })
  hasCoordinates: boolean;

  @Prop()
  origin: string;

  @Prop({ type: JSON })
  fullInfo: any;

  @Prop({ type: JSON })
  images: any;

  @Prop({ type: JSON })
  categories: any;

  @Prop({ type: JSON })
  location: any;
}
