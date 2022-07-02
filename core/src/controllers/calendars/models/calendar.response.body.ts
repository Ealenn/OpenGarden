import { ApiProperty } from '@nestjs/swagger';

export class CalendarResponseBody {
  @ApiProperty()
  plant: string;

  @ApiProperty()
  variety: string;

  @ApiProperty({ isArray: true, type: Number })
  sowingPeriod: number[];

  @ApiProperty({ isArray: true, type: Number })
  growingOnPeriod: number[];

  @ApiProperty({ isArray: true, type: Number })
  harvestPeriod: number[];
}

export class CalendarSearchResponseBody {
  @ApiProperty({ type: CalendarResponseBody, isArray: true })
  items: CalendarResponseBody[];
}
