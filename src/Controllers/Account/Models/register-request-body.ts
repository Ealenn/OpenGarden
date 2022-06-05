import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestBody {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(3, 30)
  @Matches(/[a-z0-9_-]/)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
