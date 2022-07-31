import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from '../../../entities/base.entity';

export type GardenDocument = Garden & Document;

@Schema()
export class Garden extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;
}

export const GardenSchema = SchemaFactory.createForClass(Garden);
