import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from '../../auth/roles/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
