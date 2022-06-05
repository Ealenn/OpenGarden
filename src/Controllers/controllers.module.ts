import { Module } from '@nestjs/common';
import { AccountController } from './Account/account.controller';
import { AccountMapperProfiles } from './Account/Models/mapper-profiles';
import { ProfileMapperProfiles } from './Profiles/Models/mapper-profiles';
import { ProfilesController } from './Profiles/profiles.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from '../Auth/auth.module';
import { UsersModule } from '../Users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlantsController } from './Plants/plants.controller';
import { PlantMapperProfiles } from './Plants/Models/mapper-profile';
import { EntitiesModule } from '../Entities/entities.module';

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
