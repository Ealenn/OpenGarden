import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from '../../base.entity';
import { PlantRequirement } from './requirement.entity';

export type PlantDocument = Plant & Document;

export enum PlantPrecocity {
  EARLY = 'EARLY',
  LATE = 'LATE',
  MIDSEASON = 'MIDSEASON',
}

@Schema()
export class Plant extends BaseEntity {
  @Prop({ required: true })
  commonName: string;

  @Prop({ required: true })
  variety: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  family: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: PlantPrecocity })
  precocity: PlantPrecocity;

  @Prop({ required: true, type: PlantRequirement })
  requirement: PlantRequirement;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
