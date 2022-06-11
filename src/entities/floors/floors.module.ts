import { Module } from '@nestjs/common';
import { FloorsService } from './floors.service';

@Module({
  providers: [FloorsService],
})
export class FloorsModule {}
