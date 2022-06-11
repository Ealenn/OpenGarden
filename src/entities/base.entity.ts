import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../users/models/user.entity';

export class BaseEntity {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  createdBy: mongoose.Types.ObjectId;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}
