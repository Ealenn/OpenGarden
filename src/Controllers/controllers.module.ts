import { Module } from '@nestjs/common';
import { AccountController } from './Account/account.controller';
import { JwtMapperProfile } from './Account/Models/Mappers/jwt-mapper-profile';
import { ProfileMapperProfile } from './Profiles/Models/Mappers/profile-mapper-profile';
import { ProfilesController } from './Profiles/profiles.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from '../Auth/auth.module';
import { UsersModule } from '../Users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
      serveRoot: '/static',
    }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    AuthModule,
    UsersModule,
  ],
  providers: [JwtMapperProfile, ProfileMapperProfile],
  controllers: [AccountController, ProfilesController],
})
export class ControllersModule {}
