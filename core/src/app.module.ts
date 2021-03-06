import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './configuration/configuration';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/jwt.guard';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ControllersModule } from './controllers/controllers.module';
import { EntitiesModule } from './entities/entities.module';
import { RolesGuard } from './auth/roles/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.getOrThrow<string>('mongodb.uri'),
      }),
    }),
    AuthModule,
    UsersModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ttl: config.getOrThrow<number>('throttler.ttl'),
        limit: config.getOrThrow<number>('throttler.limit'),
      }),
    }),
    ControllersModule,
    EntitiesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
