import { ApiProperty } from '@nestjs/swagger';

export class FavoriteVarietyResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class FavoriteVarietySearchResponseBody {
  @ApiProperty({ type: FavoriteVarietyResponseBody, isArray: true })
  varieties: FavoriteVarietyResponseBody[];
}
