import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { PlantType } from '../../../entities/plant.types/models/plant.type.entity';
import { PlantTypeClassificationResponseBody, PlantTypeResponseBody } from './plant.type.response.body';
import { escapeHtml } from 'xss';
import { PlantTypeClassification } from 'src/entities/plant.types/models/plant.type.classification';

@Injectable()
export class PlantTypeMapperProfiles extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        PlantTypeClassification,
        PlantTypeClassificationResponseBody,
        forMember(
          (d) => d.kingdom,
          mapFrom((s) => s.kingdom),
        ),
        forMember(
          (d) => d.clade,
          mapFrom((s) => s.clade),
        ),
        forMember(
          (d) => d.order,
          mapFrom((s) => s.order),
        ),
        forMember(
          (d) => d.family,
          mapFrom((s) => s.family),
        ),
        forMember(
          (d) => d.genus,
          mapFrom((s) => s.genus),
        ),
        forMember(
          (d) => d.species,
          mapFrom((s) => s.species),
        ),
        forMember(
          (d) => d.binomialName,
          mapFrom((s) => s.binomialName),
        ),
      );
      createMap(
        mapper,
        PlantType,
        PlantTypeResponseBody,
        forMember(
          (d) => d.id,
          mapFrom((s) => s._id.toString()),
        ),
        forMember(
          (d) => d.name,
          mapFrom((s) => s.name),
        ),
        forMember(
          (d) => d.description,
          mapFrom((s) => escapeHtml(s.description)),
        ),
        forMember(
          (d) => d.classification,
          mapFrom((s) =>
            mapper.map(s.classification, PlantTypeClassification, PlantTypeClassificationResponseBody),
          ),
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
