import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  Matches,
  IsEnum,
  ArrayUnique,
  Min,
  Max,
  IsNumber,
  IsInt,
} from 'class-validator';
import {
  PlantRequirementSunNeed,
  PlantRequirementWaterNeed,
} from '../../../entities/plants/models/requirement.entity';
import { Country } from '../../../entities/countries/models/countries.entity';
import { PlantPrecocity } from '../../../entities/plants/models/plant.entity';
import { BaseQueryPagination } from '../../base.query.pagination';
import { Transform } from 'class-transformer';
import { PlantCultureType } from '../../../entities/plants/models/culture.entity';

export class PlantsSearchRequestQuery extends BaseQueryPagination {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Example: 62a3d01f8a39990553942b90,41b8a42f6a39990553942b94',
    uniqueItems: true,
  })
  @IsOptional()
  @ArrayUnique({ each: true })
  @Transform(({ value }) => value.split(','))
  @IsString({ each: true })
  @Matches(new RegExp('^[0-9a-fA-F]{24}$'), { each: true })
  plantTypes?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches('^[a-z0-9_-]{0,30}$')
  variety?: string;

  @ApiProperty({ required: false, enum: Country })
  @IsOptional()
  origin?: Country;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, enum: PlantPrecocity })
  @IsOptional()
  precocity?: PlantPrecocity;

  @ApiProperty({ required: false, enum: PlantRequirementWaterNeed })
  @IsOptional()
  @IsEnum(PlantRequirementWaterNeed)
  waterNeed?: PlantRequirementWaterNeed;

  @ApiProperty({ required: false, enum: PlantRequirementSunNeed })
  @IsOptional()
  @IsEnum(PlantRequirementSunNeed)
  sunNeed?: PlantRequirementSunNeed;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Example: 62a3d01f8a39990553942b90,41b8a42f6a39990553942b94',
    uniqueItems: true,
  })
  @IsOptional()
  @ArrayUnique({ each: true })
  @Transform(({ value }) => value.split(','))
  @IsString({ each: true })
  @Matches(new RegExp('^[0-9a-fA-F]{24}$'), { each: true })
  floors?: string[];

  @ApiProperty({
    required: false,
    type: String,
    description: 'Example: DIRECT_SOW,GREEN_HOUSE',
    uniqueItems: true,
  })
  @IsOptional()
  @ArrayUnique({ each: true })
  @Transform(({ value }) => value.split(','))
  @IsEnum(PlantCultureType, { each: true })
  cultureTypes?: PlantCultureType[];

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  minSpacingBetweenPlants?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber()
  maxSpacingBetweenPlants?: number;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Example: 1,2,3',
  })
  @IsOptional()
  @IsInt({ each: true })
  @Transform(({ value }) => value.split(',').map((str) => parseInt(str)))
  @Min(1, { each: true })
  @Max(12, { each: true })
  sowingPeriod?: number[];

  @ApiProperty({
    required: false,
    type: String,
    description: 'Example: 1,2,3',
  })
  @IsOptional()
  @IsInt({ each: true })
  @Transform(({ value }) => value.split(',').map((str) => parseInt(str)))
  @Min(1, { each: true })
  @Max(12, { each: true })
  growingOnPeriod?: number[];

  @ApiProperty({
    required: false,
    type: String,
    description: 'Example: 1,2,3',
  })
  @IsOptional()
  @IsInt({ each: true })
  @Transform(({ value }) => value.split(',').map((str) => parseInt(str)))
  @Min(1, { each: true })
  @Max(12, { each: true })
  harvestPeriod?: number[];
}
