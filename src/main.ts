import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const currentPackage = require('../package.json');

/**
 * Application
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await bootstrapSwagger(app);
  await app.listen(process.env.APP_PORT || 8080);
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
    .setDescription(currentPackage.description)
    .setVersion(process.env.APP_VERSION || currentPackage.version)
    .setLicense(currentPackage.license, currentPackage.licenseUrl)
    .setExternalDoc('GitHub Repository', currentPackage.homepage)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
}

/**
 * Run
 */
bootstrap();
