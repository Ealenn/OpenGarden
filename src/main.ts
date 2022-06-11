import { BadRequestException, INestApplication, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet, { HelmetOptions } from 'helmet';
import { useContainer } from 'class-validator';

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
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new BadRequestException(validationErrors),
    }),
  );
  await bootstrapHelmet(app);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
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
    <a href="https://codecov.io/gh/Ealenn/OpenGarden"><img src="https://img.shields.io/codecov/c/github/ealenn/OpenGarden?style=for-the-badge&amp;logo=codecov" alt="Codecov"></a>
    <a href="https://www.codefactor.io/repository/github/ealenn/OpenGarden"><img src="https://img.shields.io/codefactor/grade/github/ealenn/OpenGarden?style=for-the-badge" alt="CodeFactor Grade"></a>
    <a href="https://github.com/Ealenn/OpenGarden/stargazers"><img src="https://img.shields.io/github/stars/Ealenn/OpenGarden?style=for-the-badge&amp;logo=github" alt="GitHub stars"></a>
    <a href="https://github.com/Ealenn/OpenGarden/issues"><img src="https://img.shields.io/github/issues/Ealenn/OpenGarden?style=for-the-badge&amp;logo=github" alt="GitHub issues"></a>
  </p>
  
  <h2>Description</h2>
  <p>
    This API provides lots of information about plantations, their needs, and sowing advice.
  </p>

  <p><a href="https://github.com/users/Ealenn/projects/3"><img src="https://img.shields.io/badge/view-roadmap-blue?logo=trello&amp;style=for-the-badge" alt="Roadmap"></a></p>

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
