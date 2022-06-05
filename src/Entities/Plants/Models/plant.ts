import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from '../../../Entities/base.entity';

export type PlantDocument = Plant & Document;

@Schema()
export class Plant extends BaseEntity {
  @Prop({ required: true })
  commonName: string;

  @Prop({ required: true })
  variety: string;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
