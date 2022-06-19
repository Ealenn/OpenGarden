import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { FavoriteVariety } from '../../../entities/favorites/models/favorite.variety.entity';
import { FavoriteVarietyResponseBody } from './favorite.response.body';

@Injectable()
export class FavoriteVarietiesMapperProfiles extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        FavoriteVariety,
        FavoriteVarietyResponseBody,
        forMember(
          (d) => d.id,
          mapFrom((s) => s.variety.toString()),
        ),
        forMember(
          (d) => d.createdBy,
          mapFrom((s) => s.createdBy.toString()),
        ),
        forMember(
          (d) => d.createdAt,
          mapFrom((s) => s.createdAt),
        ),
        forMember(
          (d) => d.updatedAt,
          mapFrom((s) => s.updatedAt),
        ),
      );
    };
  }
}
