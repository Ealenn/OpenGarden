import { Request, Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ApiResponse } from '@nestjs/swagger';
import { CalendarsService } from '../../entities/calendars/calendars.service';
import { CalendarResponseBody, CalendarSearchResponseBody } from './models/calendar.response.body';
import { CalendarItem } from '../../entities/calendars/calendars.model';

@ApiBearerAuth()
@ApiTags('Calendars')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('calendars')
export class CalendarsController {
  constructor(private calendarsService: CalendarsService, @InjectMapper() private mapper: Mapper) {}

  @Get()
  @ApiResponse({ status: 200, type: CalendarSearchResponseBody })
  async getCalendar(@Request() req) {
    const calendars = await this.calendarsService.search(req.user);
    const body: CalendarSearchResponseBody = {
      items: this.mapper.mapArray(calendars.items, CalendarItem, CalendarResponseBody),
    };
    return body;
  }
}
