import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Floor, FloorSchema } from '../../floors/models/floor.entity';

export enum VarietyRequirementWaterNeed {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class VarietyRequirementWater {
  @Prop({ required: true, enum: VarietyRequirementWaterNeed })
  needs: VarietyRequirementWaterNeed;

  @Prop()
  comment: string;
}

export enum VarietyRequirementSunNeed {
  FULLSUN = 'FULLSUN',
  SEMISHADE = 'SEMISHADE',
  SHADOW = 'SHADOW',
}

export class VarietyRequirementSun {
  @Prop({ required: true, enum: VarietyRequirementSunNeed })
  needs: VarietyRequirementSunNeed;

  @Prop()
  comment: string;
}

export class VarietyRequirement {
  @Prop({ required: true })
  water: VarietyRequirementWater;

  @Prop({ required: true })
  sun: VarietyRequirementSun;

  @Prop({ required: true, type: [{ type: Array<mongoose.Schema.Types.ObjectId>, ref: Floor.name, childSchemas: FloorSchema }] })
  floors: mongoose.Types.ObjectId[];
}
