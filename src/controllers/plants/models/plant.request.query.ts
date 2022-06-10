import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Matches } from 'class-validator';
import { Country } from '../../../entities/countries/models/countries.entity';
import { PlantPrecocity } from '../../../entities/plants/models/plant.entity';
import { BaseQueryPagination } from '../../base.query.pagination';

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
}
