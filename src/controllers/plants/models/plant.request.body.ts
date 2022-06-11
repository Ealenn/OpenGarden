import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Matches,
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

export class CreatePlantRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  @Matches('^[a-z0-9_-]{3,30}$')
  commonName: string;

  @ApiProperty({ required: true })
  @IsString()
  @Matches('^[a-z0-9_-]{3,30}$')
  variety: string;

  @ApiProperty({ required: true, enum: Country })
  origin: Country;

  @ApiProperty({ required: true })
  @IsString()
  @Matches('^[a-z0-9_-]{3,30}$')
  family: string;

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
}
