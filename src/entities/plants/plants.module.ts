import { Module } from '@nestjs/common';
import { PlantsService } from './plants.service';

@Module({
  providers: [PlantsService],
})
export class PlantsModule {}
