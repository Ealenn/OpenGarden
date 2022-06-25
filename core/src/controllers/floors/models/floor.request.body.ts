import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class CreateFloorRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  @Matches('^[a-z0-9_-]{3,30}$')
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;
}

export class UpdateFloorRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  @Matches('^[a-z0-9_-]{3,30}$')
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;
}
