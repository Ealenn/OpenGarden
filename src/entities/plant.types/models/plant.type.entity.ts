import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from '../../base.entity';
import { PlantTypeClassification } from './plant.type.classification';

export type PlantTypeDocument = PlantType & Document;

@Schema()
export class PlantType extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: PlantTypeClassification })
  classification: PlantTypeClassification;
}

export const PlantTypeSchema = SchemaFactory.createForClass(PlantType);
