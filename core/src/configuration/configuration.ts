export interface AppConfiguration {
  port: number;
  version: string;
  allowOrigin: string;
  jwt: {
    secret: string;
    ttl: string;
  };
  hash: {
    salt: number;
  };
  mongodb: {
    uri: string;
  };
  throttler: {
    ttl: number;
    limit: number;
  };
}

export default () => {
  const configuration: AppConfiguration = {
    port: parseInt(process.env.PORT, 10) || 8080,
    version: process.env.APP_VERSION,
    allowOrigin: process.env.APP_ORIGIN || '*',
    jwt: {
      secret: process.env.APP_SECRET,
      ttl: process.env.APP_JWT_TTL || '5m',
    },
    hash: {
      salt: parseInt(process.env.APP_HASH_SALT) || 10,
    },
    mongodb: {
      uri: process.env.MONGODB_URI,
    },
    throttler: {
      ttl: parseInt(process.env.APP_THROTTLER_TTL) || 60,
      limit: parseInt(process.env.APP_THROTTLER_LIMIT) || 20,
    },
  };
  return configuration;
};
