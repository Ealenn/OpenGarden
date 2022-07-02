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
import { GardensService } from './gardens/gardens.service';
import { CalendarsService } from './calendars/calendars.service';
import { Garden, GardenSchema } from './gardens/models/garden.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plant.name, schema: PlantSchema }]),
    MongooseModule.forFeature([{ name: Variety.name, schema: VarietySchema }]),
    MongooseModule.forFeature([{ name: Floor.name, schema: FloorSchema }]),
    MongooseModule.forFeature([{ name: FavoriteVariety.name, schema: FavoriteVarietySchema }]),
    MongooseModule.forFeature([{ name: Garden.name, schema: GardenSchema }]),
  ],
  providers: [
    PlantsService,
    VarietiesService,
    FloorsService,
    FavoritesService,
    GardensService,
    CalendarsService,
  ],
  exports: [
    PlantsService,
    VarietiesService,
    FloorsService,
    FavoritesService,
    GardensService,
    CalendarsService,
  ],
})
export class EntitiesModule {}
