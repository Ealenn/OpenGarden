import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Variety, VarietySchema } from './varieties/models/variety.entity';
import { VarietiesService } from './varieties/varieties.service';
import { FloorsService } from './floors/floors.service';
import { Floor, FloorSchema } from './floors/models/floor.entity';
import { Plant, PlantSchema } from './plants/models/plant.entity';
import { PlantsService } from './plants/plants.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),
    MongooseModule.forFeature([{ name: Variety.name, schema: VarietySchema }]),
    MongooseModule.forFeature([{ name: Floor.name, schema: FloorSchema }]),
  ],
  providers: [PlantsService, VarietiesService, FloorsService],
  exports: [PlantsService, VarietiesService, FloorsService],
})
export class EntitiesModule {}
