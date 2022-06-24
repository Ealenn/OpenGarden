import { Prop } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';

export enum PublishedState {
  ONLINE = 'ONLINE',
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
}

export class BasePublishedEntity extends BaseEntity {
  @Prop({ required: true, enum: PublishedState })
  status: PublishedState;
}
