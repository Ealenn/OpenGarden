import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Plant } from '../../../entities/plants/models/plant.entity';
import { PlantResponseBody } from './plant.response.body';
import { escapeHtml } from 'xss';

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
          mapFrom((s) => escapeHtml(s.commonName)),
        ),
        forMember(
          (d) => d.variety,
          mapFrom((s) => escapeHtml(s.variety)),
        ),
        forMember(
          (d) => d.family,
          mapFrom((s) => escapeHtml(s.family)),
        ),
        forMember(
          (d) => d.origin,
          mapFrom((s) => s.origin),
        ),
        forMember(
          (d) => d.description,
          mapFrom((s) => escapeHtml(s.description)),
        ),
        forMember(
          (d) => d.precocity,
          mapFrom((s) => s.precocity),
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
