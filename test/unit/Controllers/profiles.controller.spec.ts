import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../../../src/Auth/auth.module';
import { ProfileMapperProfiles } from '../../../src/Controllers/Profiles/Models/mapper-profiles';
import { UsersModule } from '../../../src/Users/users.module';
import { ProfilesController } from '../../../src/Controllers/Profiles/profiles.controller';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../helpers/mongo-memory-server';
import { rootConfigTestModule } from '../helpers/config-test-module';

describe('ProfilesController', () => {
  let profilesController: ProfilesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        rootConfigTestModule(''),
        rootMongooseTestModule(),
        AutomapperModule.forRoot({ strategyInitializer: classes() }),
        AuthModule,
        UsersModule,
      ],
      providers: [ProfileMapperProfiles],
      controllers: [ProfilesController],
    }).compile();

    profilesController = app.get<ProfilesController>(ProfilesController);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('Should be defined', () => {
    expect(profilesController).toBeDefined();
  });
});
