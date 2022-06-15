import { Prop } from '@nestjs/mongoose';

export class PlantClassification {
  @Prop({ required: true })
  kingdom: string;

  @Prop({ required: true })
  clade: string[];

  @Prop({ required: true })
  order: string;

  @Prop({ required: true })
  family: string;

  @Prop({ required: true })
  genus: string;

  @Prop({ required: true })
  species: string;

  @Prop({ required: true })
  binomialName: string;
}
