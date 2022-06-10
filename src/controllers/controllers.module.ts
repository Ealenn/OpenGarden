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
  ],
  controllers: [AccountController, ProfilesController, PlantsController],
})
export class ControllersModule {}
