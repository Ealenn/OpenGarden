import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Plant } from '../../plants/models/plant.entity';
import { BaseEntity } from '../../base.entity';
import { VarietyRequirement } from './requirement.entity';
import { VarietyCulture } from './culture.entity';

export type VarietyDocument = Variety & Document;

export enum VarietyPrecocity {
  EARLY = 'EARLY',
  LATE = 'LATE',
  MIDSEASON = 'MIDSEASON',
}

@Schema()
export class Variety extends BaseEntity {
  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: Plant.name }] })
  plant: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: VarietyPrecocity })
  precocity: VarietyPrecocity;

  @Prop({ required: true, type: VarietyRequirement })
  requirement: VarietyRequirement;

  @Prop({ required: true, type: VarietyCulture })
  culture: VarietyCulture;
}

export const VarietySchema = SchemaFactory.createForClass(Variety);
