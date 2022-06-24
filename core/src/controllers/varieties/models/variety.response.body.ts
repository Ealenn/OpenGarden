import { ApiProperty } from '@nestjs/swagger';
import {
  VarietyRequirementSunNeed,
  VarietyRequirementWaterNeed,
} from '../../../entities/varieties/models/requirement.entity';
import { Country } from '../../../entities/countries/models/countries.entity';
import { VarietyPrecocity } from '../../../entities/varieties/models/variety.entity';
import { VarietyCultureType } from '../../../entities/varieties/models/culture.entity';
import { PublishedState } from '../../../entities/base.published.entity';

export class VarietyRequirementWaterResponseBody {
  @ApiProperty({ enum: VarietyRequirementWaterNeed })
  needs: VarietyRequirementWaterNeed;

  @ApiProperty()
  comment: string;
}

export class VarietyRequirementSunResponseBody {
  @ApiProperty({ enum: VarietyRequirementSunNeed })
  needs: VarietyRequirementSunNeed;

  @ApiProperty()
  comment: string;
}

export class VarietyRequirementResponseBody {
  @ApiProperty({ type: VarietyRequirementWaterResponseBody })
  water: VarietyRequirementWaterResponseBody;

  @ApiProperty({ type: VarietyRequirementSunResponseBody })
  sun: VarietyRequirementSunResponseBody;

  @ApiProperty({ type: String, isArray: true })
  floors: string[];
}

export class VarietyCultureResponseBody {
  @ApiProperty({ required: true, enum: VarietyCultureType, isArray: true })
  cultureTypes: VarietyCultureType[];

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

export class VarietyResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  plant: string;

  @ApiProperty()
  variety: string;

  @ApiProperty({ enum: Country })
  origin: Country;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: VarietyPrecocity })
  precocity: VarietyPrecocity;

  @ApiProperty({ type: VarietyRequirementResponseBody })
  requirement: VarietyRequirementResponseBody;

  @ApiProperty({ type: VarietyCultureResponseBody })
  culture: VarietyCultureResponseBody;

  @ApiProperty({ enum: PublishedState })
  status: PublishedState;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class VarietySearchResponseBody {
  @ApiProperty({ type: VarietyResponseBody, isArray: true })
  varieties: VarietyResponseBody[];
}
