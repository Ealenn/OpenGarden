import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './Auth/auth.module';
import { UsersModule } from './Users/users.module';
import configuration from './Config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './Auth/jwt-auth.guard';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ControllersModule } from './Controllers/controllers.module';
import { EntitiesModule } from './Entities/entities.module';

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
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
