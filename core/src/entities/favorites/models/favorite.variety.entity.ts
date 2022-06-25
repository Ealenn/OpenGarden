import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Variety, VarietySchema } from '../../../entities/varieties/models/variety.entity';
import { BaseEntity } from '../../base.entity';

export type FavoriteVarietyDocument = FavoriteVariety & Document;

@Schema()
export class FavoriteVariety extends BaseEntity {
  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Variety.name, childSchemas: VarietySchema }],
  })
  variety: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  compositeKey: string;
}

export const FavoriteVarietySchema = SchemaFactory.createForClass(FavoriteVariety);
