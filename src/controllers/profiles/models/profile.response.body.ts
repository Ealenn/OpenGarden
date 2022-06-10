import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;
}
