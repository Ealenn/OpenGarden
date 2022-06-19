import { Role } from '../roles/role.enum';

export interface JwtContent {
  /**
   * User ID
   */
  sub: string;
  username: string;
  email: string;
  roles: Role[];
}
