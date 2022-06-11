import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Floor } from '../../../entities/floors/models/floor.entity';

export enum PlantRequirementWaterNeed {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export class PlantRequirementWater {
  @Prop({ required: true, enum: PlantRequirementWaterNeed })
  needs: PlantRequirementWaterNeed;

  @Prop()
  comment: string;
}

export enum PlantRequirementSunNeed {
  FULLSUN = 'FULLSUN',
  SEMISHADE = 'SEMISHADE',
  SHADOW = 'SHADOW',
}

export class PlantRequirementSun {
  @Prop({ required: true, enum: PlantRequirementSunNeed })
  needs: PlantRequirementSunNeed;

  @Prop()
  comment: string;
}

export class PlantRequirement {
  @Prop({ required: true })
  water: PlantRequirementWater;

  @Prop({ required: true })
  sun: PlantRequirementSun;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Floor.name }] })
  floors: mongoose.Types.ObjectId[];
}
