import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { PlantType } from '../../plant.types/models/plant.type.entity';
import { BaseEntity } from '../../base.entity';
import { PlantRequirement } from './requirement.entity';
import { PlantCulture } from './culture.entity';

export type PlantDocument = Plant & Document;

export enum PlantPrecocity {
  EARLY = 'EARLY',
  LATE = 'LATE',
  MIDSEASON = 'MIDSEASON',
}

@Schema()
export class Plant extends BaseEntity {
  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: PlantType.name }] })
  plantType: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  variety: string;

  @Prop({ required: true })
  origin: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, enum: PlantPrecocity })
  precocity: PlantPrecocity;

  @Prop({ required: true, type: PlantRequirement })
  requirement: PlantRequirement;

  @Prop({ required: true, type: PlantCulture })
  culture: PlantCulture;
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
