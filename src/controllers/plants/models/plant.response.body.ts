import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../../../entities/countries/models/countries.entity';
import { PlantPrecocity } from '../../../entities/plants/models/plant.entity';

export class PlantResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  commonName: string;

  @ApiProperty()
  variety: string;

  @ApiProperty({ enum: Country })
  origin: Country;

  @ApiProperty()
  family: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: PlantPrecocity })
  precocity: PlantPrecocity;

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
