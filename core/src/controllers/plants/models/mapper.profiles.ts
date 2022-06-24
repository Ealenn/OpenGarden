import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Plant } from '../../../entities/plants/models/plant.entity';
import { PlantClassificationResponseBody, PlantResponseBody } from './plant.response.body';
import { PlantClassification } from '../../../entities/plants/models/plant.classification';

@Injectable()
export class PlantMapperProfiles extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        PlantClassification,
        PlantClassificationResponseBody,
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
        Plant,
        PlantResponseBody,
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
          mapFrom((s) => s.description),
        ),
        forMember(
          (d) => d.classification,
          mapFrom((s) => mapper.map(s.classification, PlantClassification, PlantClassificationResponseBody)),
        ),
        forMember(
          (d) => d.status,
          mapFrom((s) => s.status),
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
