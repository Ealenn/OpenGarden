import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from '../../base.entity';

export type FloorDocument = Floor & Document;

@Schema()
export class Floor extends BaseEntity {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const FloorSchema = SchemaFactory.createForClass(Floor);
