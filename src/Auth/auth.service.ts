import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../Users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtContent } from './Models/jwt-content';
import { User } from '../Users/Models/user';
import { HashService } from './hash.service';
import { Jwt } from './Models/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && this.hashService.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string): Promise<Jwt> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !this.hashService.compare(password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload: JwtContent = {
      sub: user._id.toString(),
      email: user.email,
      username: user.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
