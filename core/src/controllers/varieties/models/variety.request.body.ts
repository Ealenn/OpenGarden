import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Matches,
  Max,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import {
  VarietyRequirementSunNeed,
  VarietyRequirementWaterNeed,
} from '../../../entities/varieties/models/requirement.entity';
import { Country } from '../../../entities/countries/models/countries.entity';
import { VarietyPrecocity } from '../../../entities/varieties/models/variety.entity';
import { Type } from 'class-transformer';
import { FloorExistsRule } from '../../floors/constraint/floor.exists.rule';
import { PlantExistsRule } from '../../plants/constraint/plant.exists.rule';
import { VarietyCultureType } from '../../../entities/varieties/models/culture.entity';

export class CreateVarietyRequirementWaterRequestBody {
  @ApiProperty({ required: true, enum: VarietyRequirementWaterNeed })
  @IsEnum(VarietyRequirementWaterNeed)
  needs: VarietyRequirementWaterNeed;

  @ApiProperty()
  comment: string;
}

export class CreateVarietyRequirementSunRequestBody {
  @ApiProperty({ required: true, enum: VarietyRequirementSunNeed })
  @IsEnum(VarietyRequirementSunNeed)
  needs: VarietyRequirementSunNeed;

  @ApiProperty()
  comment: string;
}

export class CreateVarietyRequirementRequestBody {
  @ApiProperty({ required: true, type: CreateVarietyRequirementWaterRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateVarietyRequirementWaterRequestBody)
  water: CreateVarietyRequirementWaterRequestBody;

  @ApiProperty({ required: true, type: CreateVarietyRequirementSunRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateVarietyRequirementSunRequestBody)
  sun: CreateVarietyRequirementSunRequestBody;

  @ApiProperty({ required: true })
  @IsArray()
  @IsString({ each: true })
  @Matches(new RegExp('^[0-9a-fA-F]{24}$'), { each: true })
  @Validate(FloorExistsRule, { each: true })
  floors: string[];
}

export class CreateVarietyCultureRequestBody {
  @ApiProperty({ required: true, enum: VarietyCultureType, isArray: true })
  @IsArray()
  @IsEnum(VarietyCultureType, { each: true })
  cultureTypes: VarietyCultureType[];

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true, type: Number })
  @IsInt()
  @Min(1)
  spacingBetweenPlants: number;

  @ApiProperty({ required: true, type: Number, isArray: true })
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(12, { each: true })
  sowingPeriod: number[];

  @ApiProperty({ required: true, type: Number, isArray: true })
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(12, { each: true })
  growingOnPeriod: number[];

  @ApiProperty({ required: true, type: Number, isArray: true })
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(12, { each: true })
  harvestPeriod: number[];
}

export class CreateVarietyRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  @Matches(new RegExp('^[0-9a-fA-F]{24}$'))
  @Validate(PlantExistsRule)
  plant: string;

  @ApiProperty({ required: true })
  @IsString()
  @Matches('^[a-z0-9_-]{3,30}$')
  name: string;

  @ApiProperty({ required: true, enum: Country })
  origin: Country;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true, enum: VarietyPrecocity })
  precocity: VarietyPrecocity;

  @ApiProperty({ required: true, type: CreateVarietyRequirementRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateVarietyRequirementRequestBody)
  requirement: CreateVarietyRequirementRequestBody;

  @ApiProperty({ required: true, type: CreateVarietyCultureRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateVarietyCultureRequestBody)
  culture: CreateVarietyCultureRequestBody;
}

export class UpdateVarietyRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  @Matches(new RegExp('^[0-9a-fA-F]{24}$'))
  @Validate(PlantExistsRule)
  plant: string;

  @ApiProperty({ required: true })
  @IsString()
  @Matches('^[a-z0-9_-]{3,30}$')
  name: string;

  @ApiProperty({ required: true, enum: Country })
  origin: Country;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true, enum: VarietyPrecocity })
  precocity: VarietyPrecocity;

  @ApiProperty({ required: true, type: CreateVarietyRequirementRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateVarietyRequirementRequestBody)
  requirement: CreateVarietyRequirementRequestBody;

  @ApiProperty({ required: true, type: CreateVarietyCultureRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateVarietyCultureRequestBody)
  culture: CreateVarietyCultureRequestBody;
}
