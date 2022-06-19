import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from '../../base.entity';
import { PlantClassification } from './plant.classification';

export type PlantDocument = Plant & Document;

@Schema()
export class Plant extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: PlantClassification })
  classification: PlantClassification;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
