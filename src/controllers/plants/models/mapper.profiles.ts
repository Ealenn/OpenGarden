import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Plant } from '../../../entities/plants/models/plant.entity';
import {
  PlantCultureResponseBody,
  PlantRequirementResponseBody,
  PlantRequirementSunResponseBody,
  PlantRequirementWaterResponseBody,
  PlantResponseBody,
} from './plant.response.body';
import { escapeHtml } from 'xss';
import {
  PlantRequirement,
  PlantRequirementSun,
  PlantRequirementWater,
} from '../../../entities/plants/models/requirement.entity';
import { PlantCulture } from '../../../entities/plants/models/culture.entity';

@Injectable()
export class PlantMapperProfiles extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      /**
       * PlantRequirement
       */
      createMap(
        mapper,
        PlantRequirementWater,
        PlantRequirementWaterResponseBody,
        forMember(
          (d) => d.needs,
          mapFrom((s) => s.needs),
        ),
        forMember(
          (d) => d.comment,
          mapFrom((s) => escapeHtml(s.comment)),
        ),
      );
      createMap(
        mapper,
        PlantRequirementSun,
        PlantRequirementSunResponseBody,
        forMember(
          (d) => d.needs,
          mapFrom((s) => s.needs),
        ),
        forMember(
          (d) => d.comment,
          mapFrom((s) => escapeHtml(s.comment)),
        ),
      );
      createMap(
        mapper,
        PlantRequirement,
        PlantRequirementResponseBody,
        forMember(
          (d) => d.sun,
          mapFrom((s) => mapper.map(s.sun, PlantRequirementSun, PlantRequirementSunResponseBody)),
        ),
        forMember(
          (d) => d.water,
          mapFrom((s) => mapper.map(s.water, PlantRequirementWater, PlantRequirementWaterResponseBody)),
        ),
        forMember(
          (d) => d.floors,
          mapFrom((s) => s.floors.map((floor) => floor.toString())),
        ),
      );
      /**
       * Culture
       */
      createMap(
        mapper,
        PlantCulture,
        PlantCultureResponseBody,
        forMember(
          (d) => d.cultureTypes,
          mapFrom((s) => s.cultureTypes),
        ),
        forMember(
          (d) => d.description,
          mapFrom((s) => escapeHtml(s.description)),
        ),
        forMember(
          (d) => d.spacingBetweenPlants,
          mapFrom((s) => s.spacingBetweenPlants),
        ),
        forMember(
          (d) => d.sowingPeriod,
          mapFrom((s) => s.sowingPeriod),
        ),
        forMember(
          (d) => d.growingOnPeriod,
          mapFrom((s) => s.growingOnPeriod),
        ),
        forMember(
          (d) => d.harvestPeriod,
          mapFrom((s) => s.harvestPeriod),
        ),
      );
      /**
       * Plant
       */
      createMap(
        mapper,
        Plant,
        PlantResponseBody,
        forMember(
          (d) => d.id,
          mapFrom((s) => s._id.toString()),
        ),
        forMember(
          (d) => d.plantType,
          mapFrom((s) => s.plantType.toString()),
        ),
        forMember(
          (d) => d.variety,
          mapFrom((s) => escapeHtml(s.variety)),
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
          (d) => d.requirement,
          mapFrom((s) => mapper.map(s.requirement, PlantRequirement, PlantRequirementResponseBody)),
        ),
        forMember(
          (d) => d.culture,
          mapFrom((s) => mapper.map(s.culture, PlantCulture, PlantCultureResponseBody)),
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
