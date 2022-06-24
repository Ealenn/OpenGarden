import { ApiProperty } from '@nestjs/swagger';
import { PublishedState } from '../../../entities/base.published.entity';

export class PlantClassificationResponseBody {
  @ApiProperty()
  kingdom: string;

  @ApiProperty({ isArray: true })
  clade: string[];

  @ApiProperty()
  order: string;

  @ApiProperty()
  family: string;

  @ApiProperty()
  genus: string;

  @ApiProperty()
  species: string;

  @ApiProperty()
  binomialName: string;
}

export class PlantResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: PlantClassificationResponseBody })
  classification: PlantClassificationResponseBody;

  @ApiProperty({ enum: PublishedState })
  status: PublishedState;

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
