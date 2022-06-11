import { ApiProperty } from '@nestjs/swagger';

export class PlantTypeClassificationResponseBody {
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

export class PlantTypeResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: PlantTypeClassificationResponseBody })
  classification: PlantTypeClassificationResponseBody;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PlantTypeSearchResponseBody {
  @ApiProperty({ type: PlantTypeResponseBody, isArray: true })
  plantType: PlantTypeResponseBody[];
}
