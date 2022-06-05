import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plant, PlantSchema } from './Plants/Models/plant';
import { PlantsService } from './Plants/Plants.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),
  ],
  providers: [PlantsService],
  exports: [PlantsService],
})
export class EntitiesModule {}
