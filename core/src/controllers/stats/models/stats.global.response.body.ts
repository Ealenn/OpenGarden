import { ApiProperty } from '@nestjs/swagger';

export class StatsGlobalCountResponseBody {
  @ApiProperty()
  users: number;

  @ApiProperty()
  plants: number;

  @ApiProperty()
  varieties: number;

  @ApiProperty()
  floors: number;
}

export class StatsGlobalResponseBody {
  @ApiProperty({ type: StatsGlobalCountResponseBody })
  estimatedCount: StatsGlobalCountResponseBody;
}
