import { ApiProperty } from '@nestjs/swagger';
import { PublishedState } from '../../../entities/base.published.entity';

export class FloorResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: PublishedState })
  status: PublishedState;

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
