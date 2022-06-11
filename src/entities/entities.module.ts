import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Plant, PlantSchema } from './plants/models/plant.entity';
import { PlantsService } from './plants/plants.service';
import { FloorsService } from './floors/floors.service';
import { Floor, FloorSchema } from './floors/models/floor.entity';
import { PlantType, PlantTypeSchema } from './plant.types/models/plant.type.entity';
import { PlanttypesService } from './plant.types/plant.types.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlantType.name, schema: PlantTypeSchema }]),
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),
    MongooseModule.forFeature([{ name: Floor.name, schema: FloorSchema }]),
  ],
  providers: [PlanttypesService, PlantsService, FloorsService],
  exports: [PlanttypesService, PlantsService, FloorsService],
})
export class EntitiesModule {}
