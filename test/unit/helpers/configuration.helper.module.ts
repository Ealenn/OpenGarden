import { ConfigModule } from '@nestjs/config';
import { AppConfiguration } from '../../../src/configuration/configuration';

export const testConfiguration: AppConfiguration = {
  port: 3000,
  version: '0.0.0',
  jwt: {
    secret: '123456789',
    ttl: '1d',
  },
  hash: {
    salt: 1,
  },
  mongodb: {
    uri: 'mondodb://localhost',
  },
  throttler: {
    ttl: 60,
    limit: 1000,
  },
};

export const configurationHelperModule = (mondoDbUri: string) => {
  const config = {
    ...testConfiguration,
    mongodb: {
      uri: mondoDbUri,
    },
  };
  return ConfigModule.forRoot({
    load: [() => config],
  });
};
