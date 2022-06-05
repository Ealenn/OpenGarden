import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';
import { BaseQueryPagination } from '../../../Controllers/base.query.pagination';

export class PlantsSearchRequestQuery extends BaseQueryPagination {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  commonName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  variety?: string;
}
