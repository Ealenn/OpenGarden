import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../../../users/models/user.entity';
import { ProfileResponseBody } from './profile.response.body';

@Injectable()
export class ProfileMapperProfiles extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        User,
        ProfileResponseBody,
        forMember(
          (d) => d.id,
          mapFrom((s) => s._id.toString()),
        ),
        forMember(
          (d) => d.username,
          mapFrom((s) => s.username),
        ),
        forMember(
          (d) => d.roles,
          mapFrom((s) => s.roles),
        ),
      );
    };
  }
}
