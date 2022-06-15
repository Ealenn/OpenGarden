import { Prop } from '@nestjs/mongoose';

export enum VarietyCultureType {
  DIRECT_SOW = 'DIRECT_SOW',
  GREEN_HOUSE = 'GREEN_HOUSE',
  POT = 'POT',
}

export class VarietyCulture {
  @Prop({ required: true, enum: VarietyCultureType })
  cultureTypes: VarietyCultureType[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  spacingBetweenPlants: number;

  @Prop({ required: true })
  sowingPeriod: number[];

  @Prop({ required: true })
  growingOnPeriod: number[];

  @Prop({ required: true })
  harvestPeriod: number[];
}
