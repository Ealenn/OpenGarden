import { ApiProperty } from '@nestjs/swagger';

export class JwtResponseBody {
  @ApiProperty()
  access_token: string;
}
