import { BadRequestException, INestApplication, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet, { HelmetOptions } from 'helmet';
import { useContainer } from 'class-validator';
import * as Path from 'path';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const PACKAGE_FILE_PATH = Path.join(__dirname, '../package.json');

/**
 * Application
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new BadRequestException(validationErrors),
    }),
  );
  await bootstrapHelmet(app, config);
  await bootstrapSwagger(app);
  await app.listen(config.getOrThrow<number>('port'));
}

/**
 * Swagger
 */
async function bootstrapSwagger(app: INestApplication): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const currentPackage = require(PACKAGE_FILE_PATH);
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
  SwaggerModule.setup('/swagger', app, document, {
    customfavIcon: '/static/favicon.ico',
    customSiteTitle: appName,
  });
}

function getSwaggerDescription(): string {
  return `
  <p>
    <a href="https://codecov.io/gh/Ealenn/OpenGarden"><img src="https://img.shields.io/codecov/c/github/ealenn/OpenGarden?style=for-the-badge&amp;logo=codecov" alt="Codecov"></a>
    <a href="https://www.codefactor.io/repository/github/ealenn/OpenGarden"><img src="https://img.shields.io/codefactor/grade/github/ealenn/OpenGarden?style=for-the-badge" alt="CodeFactor Grade"></a>
    <a href="https://github.com/Ealenn/OpenGarden/stargazers"><img src="https://img.shields.io/github/stars/Ealenn/OpenGarden?style=for-the-badge&amp;logo=github" alt="GitHub stars"></a>
    <a href="https://github.com/Ealenn/OpenGarden/issues"><img src="https://img.shields.io/github/issues/Ealenn/OpenGarden?style=for-the-badge&amp;logo=github" alt="GitHub issues"></a>
  </p>
  
  <h2>Description</h2>
  <p>
    This API provides lots of information about plantations, their needs, and sowing advice.
  </p>

  <p>
    <a href="https://github.com/users/Ealenn/projects/3"><img src="https://img.shields.io/badge/view-roadmap-blue?logo=trello&amp;style=for-the-badge" alt="Roadmap"></a>
    <a href="https://opengarden-admin.herokuapp.com/"><img src="https://img.shields.io/badge/view-Admin-blue?logo=pwa&amp;style=for-the-badge" alt="Admin"></a>
  </p>

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
async function bootstrapHelmet(app: INestApplication, config: ConfigService): Promise<void> {
  const helmetOptions: HelmetOptions = {
    hidePoweredBy: true,
    originAgentCluster: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: {
      policy: 'unsafe-none',
    },
    crossOriginResourcePolicy: {
      policy: 'cross-origin',
    },
    contentSecurityPolicy: false,
    referrerPolicy: false,
  };
  app.use(helmet(helmetOptions));
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  const corsOptions: CorsOptions = {
    origin: config.getOrThrow('allowOrigin'),
    exposedHeaders: ['Content-Range'],
  };
  app.enableCors(corsOptions);
}

/**
 * Run
 */
bootstrap();
