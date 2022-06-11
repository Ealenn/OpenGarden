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
import { PlantsController } from './plants/plants.controller';
import { PlantMapperProfiles } from './plants/models/mapper.profiles';
import { EntitiesModule } from '../entities/entities.module';
import { FloorMapperProfiles } from './floors/models/mapper.profiles';
import { FloorsController } from './floors/floors.controller';
import { FloorExistsRule } from './floors/constraint/floor.exists.rule';
import { PlantTypeMapperProfiles } from './plant.types/models/mapper.profiles';
import { PlantTypesController } from './plant.types/plant.types.controller';
import { PlantTypeExistsRule } from './plant.types/constraint/plant.types.exists.rule';

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
    PlantTypeMapperProfiles,
    PlantTypeExistsRule,
    PlantMapperProfiles,
    FloorMapperProfiles,
    FloorExistsRule,
  ],
  controllers: [
    AccountController,
    ProfilesController,
    PlantTypesController,
    PlantsController,
    FloorsController,
  ],
})
export class ControllersModule {}
