import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../../../src/Users/users.module';
import { AuthService } from '../../../src/Auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { HashService } from '../../../src/Auth/hash.service';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../helpers/mongo-memory-server';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, HashService],
      imports: [
        rootMongooseTestModule(),
        ConfigModule,
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: 'example',
          signOptions: { expiresIn: '1d' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
});
