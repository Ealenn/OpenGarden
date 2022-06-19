import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Variety, VarietySchema } from './varieties/models/variety.entity';
import { VarietiesService } from './varieties/varieties.service';
import { FloorsService } from './floors/floors.service';
import { Floor, FloorSchema } from './floors/models/floor.entity';
import { Plant, PlantSchema } from './plants/models/plant.entity';
import { PlantsService } from './plants/plants.service';
import { FavoriteVariety, FavoriteVarietySchema } from './favorites/models/favorite.variety.entity';
import { FavoritesService } from './favorites/favorites.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),
    MongooseModule.forFeature([{ name: Variety.name, schema: VarietySchema }]),
    MongooseModule.forFeature([{ name: Floor.name, schema: FloorSchema }]),
    MongooseModule.forFeature([{ name: FavoriteVariety.name, schema: FavoriteVarietySchema }]),
  ],
  providers: [PlantsService, VarietiesService, FloorsService, FavoritesService],
  exports: [PlantsService, VarietiesService, FloorsService, FavoritesService],
})
export class EntitiesModule {}
