import { ApiProperty } from '@nestjs/swagger';
import { PlantResponseBody } from './plant-response-body';

export class PlantSearchResponseBody {
  @ApiProperty({ type: PlantResponseBody, isArray: true })
  plants: PlantResponseBody[];
}
