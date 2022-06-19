import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';
import { BaseQueryPagination } from '../../base.query.pagination';

export class PlantsSearchRequestQuery extends BaseQueryPagination {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  kingdom?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  order?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  family?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  genus?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  species?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  binomialName?: string;
}
