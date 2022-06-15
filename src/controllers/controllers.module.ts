import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AccountMapperProfiles } from './account/models/mapper.profiles';
import { ProfileMapperProfiles } from './profiles/models/mapper.profiles';
import { ProfilesController } from './profiles/profiles.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { VarietiesController } from './varieties/varieties.controller';
import { VarietyMapperProfiles } from './varieties/models/mapper.profiles';
import { EntitiesModule } from '../entities/entities.module';
import { FloorMapperProfiles } from './floors/models/mapper.profiles';
import { FloorsController } from './floors/floors.controller';
import { FloorExistsRule } from './floors/constraint/floor.exists.rule';
import { PlantMapperProfiles } from './plants/models/mapper.profiles';
import { PlantsController } from './plants/plants.controller';
import { PlantExistsRule } from './plants/constraint/plant.exists.rule';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveRoot: '/static',
    }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    AuthModule,
    UsersModule,
    EntitiesModule,
  ],
  providers: [
    AccountMapperProfiles,
    ProfileMapperProfiles,
    PlantMapperProfiles,
    PlantExistsRule,
    VarietyMapperProfiles,
    FloorMapperProfiles,
    FloorExistsRule,
  ],
  controllers: [
    AccountController,
    ProfilesController,
    PlantsController,
    VarietiesController,
    FloorsController,
  ],
})
export class ControllersModule {}
