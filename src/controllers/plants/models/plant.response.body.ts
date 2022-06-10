import { ApiProperty } from '@nestjs/swagger';

export class PlantResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  commonName: string;

  @ApiProperty()
  variety: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PlantSearchResponseBody {
  @ApiProperty({ type: PlantResponseBody, isArray: true })
  plants: PlantResponseBody[];
}
