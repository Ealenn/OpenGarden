import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Matches } from 'class-validator';
import { BaseQueryPagination } from '../../base.query.pagination';

export class FloorsSearchRequestQuery extends BaseQueryPagination {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches('^[a-z0-9_-]{0,30}$')
  name?: string;
}
