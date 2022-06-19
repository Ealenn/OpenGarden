import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../auth/roles/role.enum';

export class ProfileResponseBody {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ isArray: true, enum: Role })
  roles: Role[];
}
