import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Jwt } from '../../../../Auth/Models/jwt';
import { JwtResponseBody } from '../jwt-response-body';

@Injectable()
export class JwtMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Jwt,
        JwtResponseBody,
        forMember(
          (d) => d.access_token,
          mapFrom((s) => s.access_token),
        ),
      );
    };
  }
}
