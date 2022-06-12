import { ApiProperty } from '@nestjs/swagger';
import {
  PlantRequirementSunNeed,
  PlantRequirementWaterNeed,
} from '../../../entities/plants/models/requirement.entity';
import { Country } from '../../../entities/countries/models/countries.entity';
import { PlantPrecocity } from '../../../entities/plants/models/plant.entity';
import { PlantCultureType } from '../../../entities/plants/models/culture.entity';

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
  @ApiProperty({ type: PlantRequirementWaterResponseBody })
  water: PlantRequirementWaterResponseBody;

  @ApiProperty({ type: PlantRequirementSunResponseBody })
  sun: PlantRequirementSunResponseBody;

  @ApiProperty({ type: String, isArray: true })
  floors: string[];
}

export class PlantCultureResponseBody {
  @ApiProperty({ required: true, enum: PlantCultureType, isArray: true })
  cultureTypes: PlantCultureType[];

  @ApiProperty()
  description: string;

  @ApiProperty({ type: Number })
  spacingBetweenPlants: number;

  @ApiProperty({ type: Number, isArray: true })
  sowingPeriod: number[];

  @ApiProperty({ type: Number, isArray: true })
  growingOnPeriod: number[];

  @ApiProperty({ type: Number, isArray: true })
  harvestPeriod: number[];
}

export class PlantResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  plantType: string;

  @ApiProperty()
  variety: string;

  @ApiProperty({ enum: Country })
  origin: Country;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: PlantPrecocity })
  precocity: PlantPrecocity;

  @ApiProperty({ type: PlantRequirementResponseBody })
  requirement: PlantRequirementResponseBody;

  @ApiProperty({ type: PlantCultureResponseBody })
  culture: PlantCultureResponseBody;

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
