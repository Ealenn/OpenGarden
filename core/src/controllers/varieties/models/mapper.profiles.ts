import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Variety } from '../../../entities/varieties/models/variety.entity';
import {
  VarietyCultureResponseBody,
  VarietyRequirementResponseBody,
  VarietyRequirementSunResponseBody,
  VarietyRequirementWaterResponseBody,
  VarietyResponseBody,
} from './variety.response.body';
import { escapeHtml } from 'xss';
import {
  VarietyRequirement,
  VarietyRequirementSun,
  VarietyRequirementWater,
} from '../../../entities/varieties/models/requirement.entity';
import { VarietyCulture } from '../../../entities/varieties/models/culture.entity';

@Injectable()
export class VarietyMapperProfiles extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      /**
       * VarietyRequirement
       */
      createMap(
        mapper,
        VarietyRequirementWater,
        VarietyRequirementWaterResponseBody,
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
        VarietyRequirementSun,
        VarietyRequirementSunResponseBody,
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
        VarietyRequirement,
        VarietyRequirementResponseBody,
        forMember(
          (d) => d.sun,
          mapFrom((s) => mapper.map(s.sun, VarietyRequirementSun, VarietyRequirementSunResponseBody)),
        ),
        forMember(
          (d) => d.water,
          mapFrom((s) => mapper.map(s.water, VarietyRequirementWater, VarietyRequirementWaterResponseBody)),
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
        VarietyCulture,
        VarietyCultureResponseBody,
        forMember(
          (d) => d.cultureTypes,
          mapFrom((s) => s.cultureTypes),
        ),
        forMember(
          (d) => d.description,
          mapFrom((s) => s.description),
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
       * Variety
       */
      createMap(
        mapper,
        Variety,
        VarietyResponseBody,
        forMember(
          (d) => d.id,
          mapFrom((s) => s._id.toString()),
        ),
        forMember(
          (d) => d.plant,
          mapFrom((s) => s.plant.toString()),
        ),
        forMember(
          (d) => d.variety,
          mapFrom((s) => escapeHtml(s.name)),
        ),
        forMember(
          (d) => d.origin,
          mapFrom((s) => s.origin),
        ),
        forMember(
          (d) => d.description,
          mapFrom((s) => s.description),
        ),
        forMember(
          (d) => d.precocity,
          mapFrom((s) => s.precocity),
        ),
        forMember(
          (d) => d.requirement,
          mapFrom((s) => mapper.map(s.requirement, VarietyRequirement, VarietyRequirementResponseBody)),
        ),
        forMember(
          (d) => d.culture,
          mapFrom((s) => mapper.map(s.culture, VarietyCulture, VarietyCultureResponseBody)),
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
