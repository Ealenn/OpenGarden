import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Plant } from '../../../Entities/Plants/Models/plant';
import { PlantResponseBody } from '../../../Controllers/Plants/Models/plant-response-body';

@Injectable()
export class PlantMapperProfiles extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Plant,
        PlantResponseBody,
        forMember(
          (d) => d.id,
          mapFrom((s) => s._id.toString()),
        ),
        forMember(
          (d) => d.commonName,
          mapFrom((s) => s.commonName),
        ),
        forMember(
          (d) => d.variety,
          mapFrom((s) => s.variety),
        ),
        forMember(
          (d) => d.createdBy,
          mapFrom((s) => s.createdBy),
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
