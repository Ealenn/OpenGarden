import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class BaseEntity {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  createdBy: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}
