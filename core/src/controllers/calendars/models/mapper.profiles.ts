import { Mapper, MappingProfile, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CalendarItem } from '../../../entities/calendars/calendars.model';
import { CalendarResponseBody } from './calendar.response.body';

@Injectable()
export class CalendarsMapperProfiles extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        CalendarItem,
        CalendarResponseBody,
        forMember(
          (d) => d.plant,
          mapFrom((s) => s.plant),
        ),
        forMember(
          (d) => d.variety,
          mapFrom((s) => s.variety),
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
    };
  }
}
