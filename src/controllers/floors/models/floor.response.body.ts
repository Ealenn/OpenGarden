import { ApiProperty } from '@nestjs/swagger';

export class FloorResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class FloorSearchResponseBody {
  @ApiProperty({ type: FloorResponseBody, isArray: true })
  floors: FloorResponseBody[];
}
