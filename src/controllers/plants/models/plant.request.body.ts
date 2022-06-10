import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { Country } from '../../../entities/countries/models/countries.entity';
import { PlantPrecocity } from '../../../entities/plants/models/plant.entity';

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
}
