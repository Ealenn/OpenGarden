import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../../../src/auth/auth.module';
import { ProfileMapperProfiles } from '../../../src/controllers/profiles/models/mapper.profiles';
import { UsersModule } from '../../../src/users/users.module';
import { ProfilesController } from '../../../src/controllers/profiles/profiles.controller';
import {
  closeInMongodConnection,
  mongooseHelperModule,
} from '../helpers/mongoose.helper.module';
import { configurationHelperModule } from '../helpers/configuration.helper.module';

describe('ProfilesController', () => {
  let profilesController: ProfilesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        configurationHelperModule(''),
        mongooseHelperModule(),
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
