import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class CreatePlantClassificationRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  kingdom: string;

  @ApiProperty({ required: true })
  @IsArray()
  @IsString({ each: true })
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/, { each: true })
  clade: string[];

  @ApiProperty({ required: true })
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  order: string;

  @ApiProperty({ required: true })
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  family: string;

  @ApiProperty({ required: true })
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  genus: string;

  @ApiProperty({ required: true })
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  species: string;

  @ApiProperty({ required: true })
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  binomialName: string;
}

export class CreatePlantRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true, type: CreatePlantClassificationRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePlantClassificationRequestBody)
  classification: CreatePlantClassificationRequestBody;
}

export class UpdatePlantRequestBody {
  @ApiProperty({ required: true })
  @IsString()
  @Matches(/^[^\s][a-z0-9_ -]{1,30}[^\s]$/)
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true, type: CreatePlantClassificationRequestBody })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreatePlantClassificationRequestBody)
  classification: CreatePlantClassificationRequestBody;
}
