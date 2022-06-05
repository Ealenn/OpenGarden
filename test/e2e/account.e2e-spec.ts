import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { rootConfigTestModule } from '../unit/helpers/config-test-module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';

describe('Account', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongod.getUri(), {
          connectionName: (new Date().getTime() * Math.random()).toString(16),
        }),
        rootConfigTestModule(mongod.getUri()),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    app.close();
    if (mongod) {
      await mongod.stop();
    }
  });

  describe('/account/login (POST)', () => {
    it('Bad Credentials', async () => {
      return request(app.getHttpServer())
        .post('/account/login')
        .send({
          email: 'fake@domain.com',
          password: 'fakePassword',
        })
        .expect(401);
    });

    it('Bad Email', async () => {
      return request(app.getHttpServer())
        .post('/account/login')
        .send({
          email: 'fake',
          password: 'fakePassword',
        })
        .expect(400);
    });
  });
});
