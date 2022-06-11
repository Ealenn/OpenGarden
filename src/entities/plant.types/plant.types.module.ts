import { Module } from '@nestjs/common';
import { PlanttypesService } from './plant.types.service';

@Module({
  providers: [PlanttypesService]
})
export class PlanttypesModule {}
