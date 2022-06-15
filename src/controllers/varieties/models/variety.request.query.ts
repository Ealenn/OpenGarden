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
  VarietyRequirementSunNeed,
  VarietyRequirementWaterNeed,
} from '../../../entities/varieties/models/requirement.entity';
import { Country } from '../../../entities/countries/models/countries.entity';
import { VarietyPrecocity } from '../../../entities/varieties/models/variety.entity';
import { BaseQueryPagination } from '../../base.query.pagination';
import { Transform } from 'class-transformer';
import { VarietyCultureType } from '../../../entities/varieties/models/culture.entity';

export class VarietiesSearchRequestQuery extends BaseQueryPagination {
  @ApiProperty({
    required: false,
    type: String,
    description: 'Example: 62a3d01f8a39990553942b90,41b8a42f6a39990553942b94',
    uniqueItems: true,
  })
  @IsOptional()
  @ArrayUnique()
  @Transform(({ value }) => value.split(','))
  @IsString({ each: true })
  @Matches(new RegExp('^[0-9a-fA-F]{24}$'), { each: true })
  plants?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches('^[a-z0-9_-]{0,30}$')
  name?: string;

  @ApiProperty({ required: false, enum: Country })
  @IsOptional()
  origin?: Country;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, enum: VarietyPrecocity })
  @IsOptional()
  precocity?: VarietyPrecocity;

  @ApiProperty({ required: false, enum: VarietyRequirementWaterNeed })
  @IsOptional()
  @IsEnum(VarietyRequirementWaterNeed)
  waterNeed?: VarietyRequirementWaterNeed;

  @ApiProperty({ required: false, enum: VarietyRequirementSunNeed })
  @IsOptional()
  @IsEnum(VarietyRequirementSunNeed)
  sunNeed?: VarietyRequirementSunNeed;

  @ApiProperty({
    required: false,
    type: String,
    description: 'Example: 62a3d01f8a39990553942b90,41b8a42f6a39990553942b94',
    uniqueItems: true,
  })
  @IsOptional()
  @ArrayUnique()
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
  @ArrayUnique()
  @Transform(({ value }) => value.split(','))
  @IsEnum(VarietyCultureType, { each: true })
  cultureTypes?: VarietyCultureType[];

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
