import { Module } from '@nestjs/common';
import { CalendarsService } from './calendars.service';

@Module({
  providers: [CalendarsService],
})
export class CalendarsModule {}
