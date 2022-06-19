import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../../users/models/user.entity';
import { BaseEntity } from '../../base.entity';

export type FavoriteVarietyDocument = FavoriteVariety & Document;

@Schema()
export class FavoriteVariety extends BaseEntity {
  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  variety: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true, index: true })
  compositeKey: string;
}

export const FavoriteVarietySchema = SchemaFactory.createForClass(FavoriteVariety);
