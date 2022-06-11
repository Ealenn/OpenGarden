import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Matches, IsEnum, ArrayUnique } from 'class-validator';
import {
  PlantRequirementSunNeed,
  PlantRequirementWaterNeed,
} from '../../../entities/plants/models/requirement.entity';
import { Country } from '../../../entities/countries/models/countries.entity';
import { PlantPrecocity } from '../../../entities/plants/models/plant.entity';
import { BaseQueryPagination } from '../../base.query.pagination';
import { Transform } from 'class-transformer';

export class PlantsSearchRequestQuery extends BaseQueryPagination {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches('^[a-z0-9_-]{0,30}$')
  commonName?: string;

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
  @Matches('^[a-z0-9_-]{0,30}$')
  family?: string;

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
  waterNeed: PlantRequirementWaterNeed;

  @ApiProperty({ required: false, enum: PlantRequirementSunNeed })
  @IsOptional()
  @IsEnum(PlantRequirementSunNeed)
  sunNeed: PlantRequirementSunNeed;

  @ApiProperty({
    required: false,
    type: String,
    example: '62a3d01f8a39990553942b90,41b8a42f6a39990553942b94',
    uniqueItems: true,
  })
  @IsOptional()
  @ArrayUnique()
  @Transform(({ value }) => value.split(','))
  @IsString({ each: true })
  @Matches(new RegExp('^[0-9a-fA-F]{24}$'), { each: true })
  floors: string[];
}
