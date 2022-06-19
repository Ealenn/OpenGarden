import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, Validate } from 'class-validator';
import { VarietyExistsRule } from '../../../controllers/varieties/constraint/variety.exists.rule';

export class CreateFavoriteVarietyRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  @Matches(new RegExp('^[0-9a-fA-F]{24}$'))
  @Validate(VarietyExistsRule)
  variety: string;
}
