import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plant, PlantSchema } from './plants/models/plant.entity';
import { PlantsService } from './plants/plants.service';
import { FloorsService } from './floors/floors.service';
import { Floor, FloorSchema } from './floors/models/floor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),
    MongooseModule.forFeature([{ name: Floor.name, schema: FloorSchema }]),
  ],
  providers: [PlantsService, FloorsService],
  exports: [PlantsService, FloorsService],
})
export class EntitiesModule {}
