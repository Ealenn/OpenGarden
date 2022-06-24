import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BasePublishedEntity } from '../../base.published.entity';

export type FloorDocument = Floor & Document;

@Schema()
export class Floor extends BasePublishedEntity {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const FloorSchema = SchemaFactory.createForClass(Floor);
