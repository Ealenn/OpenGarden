import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet, { HelmetOptions } from 'helmet';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const currentPackage = require('../package.json');

/**
 * Application
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  await bootstrapSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((validationError) => ({
            value: validationError.value,
            property: validationError.property,
            constraints: validationError.constraints,
          })),
        );
      },
    }),
  );
  await bootstrapHelmet(app);
  await app.listen(config.getOrThrow<number>('port'));
}

/**
 * Swagger
 */
async function bootstrapSwagger(app: INestApplication): Promise<void> {
  const appName = currentPackage.name
    .replace('-', ' ')
    .split(' ')
    .map((word: string) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ');
  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`${currentPackage.description} ${getSwaggerDescription()}`)
    .setVersion(process.env.APP_VERSION || currentPackage.version)
    .setLicense(currentPackage.license, currentPackage.licenseUrl)
    .setExternalDoc(currentPackage.homepage, currentPackage.homepage)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document, {
    customfavIcon: '/static/favicon.ico',
    customSiteTitle: appName,
  });
}

function getSwaggerDescription(): string {
  return `
  <p>
    <b>Warning</b>: This API evolves during its development phase. The database is regularly purged.
  </p>
  <p>
    The first stable release will be 1.0.0
  </p>
  `;
}

/**
 * Helmet
 */
async function bootstrapHelmet(app: INestApplication): Promise<void> {
  const helmetOptions: HelmetOptions = {
    hidePoweredBy: true,
    crossOriginResourcePolicy: false,
  };
  app.use(helmet(helmetOptions));
}

/**
 * Run
 */
bootstrap();
