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
  PlantRequirementSunNeed,
  PlantRequirementWaterNeed,
} from '../../../entities/plants/models/requirement.entity';
import { Country } from '../../../entities/countries/models/countries.entity';
import { PlantPrecocity } from '../../../entities/plants/models/plant.entity';
import { Type } from 'class-transformer';
import { FloorExistsRule } from '../../floors/constraint/floor.exists.rule';
import { PlantTypeExistsRule } from '../../plant.types/constraint/plant.types.exists.rule';
import { PlantCultureType } from '../../../entities/plants/models/culture.entity';

export class CreatePlantRequirementWaterRequestBody {
  @ApiProperty({ required: true, enum: PlantRequirementWaterNeed })
  @IsEnum(PlantRequirementWaterNeed)
  needs: PlantRequirementWaterNeed;

  @ApiProperty()
  comment: string;
}

export class CreatePlantRequirementSunRequestBody {
  @ApiProperty({ required: true, enum: PlantRequirementSunNeed })
  @IsEnum(PlantRequirementSunNeed)
  needs: PlantRequirementSunNeed;

  @ApiProperty()
  comment: string;
}

export class CreatePlantRequirementRequestBody {
  @ApiProperty({ required: true, type: CreatePlantRequirementWaterRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePlantRequirementWaterRequestBody)
  water: CreatePlantRequirementWaterRequestBody;

  @ApiProperty({ required: true, type: CreatePlantRequirementSunRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePlantRequirementSunRequestBody)
  sun: CreatePlantRequirementSunRequestBody;

  @ApiProperty({ required: true })
  @IsArray()
  @IsString({ each: true })
  @Matches(new RegExp('^[0-9a-fA-F]{24}$'), { each: true })
  @Validate(FloorExistsRule, { each: true })
  floors: string[];
}

export class CreatePlantCultureRequestBody {
  @ApiProperty({ required: true, enum: PlantCultureType, isArray: true })
  @IsArray()
  @IsEnum(PlantCultureType, { each: true })
  cultureTypes: PlantCultureType[];

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

export class CreatePlantRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  @Matches(new RegExp('^[0-9a-fA-F]{24}$'))
  @Validate(PlantTypeExistsRule)
  plantType: string;

  @ApiProperty({ required: true })
  @IsString()
  @Matches('^[a-z0-9_-]{3,30}$')
  variety: string;

  @ApiProperty({ required: true, enum: Country })
  origin: Country;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true, enum: PlantPrecocity })
  precocity: PlantPrecocity;

  @ApiProperty({ required: true, type: CreatePlantRequirementRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePlantRequirementRequestBody)
  requirement: CreatePlantRequirementRequestBody;

  @ApiProperty({ required: true, type: CreatePlantCultureRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePlantCultureRequestBody)
  culture: CreatePlantCultureRequestBody;
}
