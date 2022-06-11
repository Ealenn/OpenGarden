import { ApiProperty } from '@nestjs/swagger';
import { PlantRequirementSunNeed, PlantRequirementWaterNeed } from '../../../entities/plants/models/requirement.entity';
import { Country } from '../../../entities/countries/models/countries.entity';
import { PlantPrecocity } from '../../../entities/plants/models/plant.entity';

export class PlantRequirementWaterResponseBody {
  @ApiProperty({ enum: PlantRequirementWaterNeed })
  needs: PlantRequirementWaterNeed;

  @ApiProperty()
  comment: string;
}

export class PlantRequirementSunResponseBody {
  @ApiProperty({ enum: PlantRequirementSunNeed })
  needs: PlantRequirementSunNeed;

  @ApiProperty()
  comment: string;
}

export class PlantRequirementResponseBody {
  @ApiProperty({ required: true })
  water: PlantRequirementWaterResponseBody;

  @ApiProperty({ required: true })
  sun: PlantRequirementSunResponseBody;

  @ApiProperty({ type: Array<string>, isArray: true })
  floors: string[];
}

export class PlantResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  plantType: string;

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

  @ApiProperty({ type: PlantRequirementResponseBody })
  requirement: PlantRequirementResponseBody

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
