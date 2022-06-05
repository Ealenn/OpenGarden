import { ApiProperty } from '@nestjs/swagger';

export class CreatePlantRequestBody {
  @ApiProperty()
  commonName: string;

  @ApiProperty()
  variety: string;
}
