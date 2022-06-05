import { Controller, Body, Post } from '@nestjs/common';
import { Public } from '../../Auth/auth.module';
import { Jwt } from '../../Auth/Models/jwt';
import { AuthService } from '../../Auth/auth.service';
import { LoginRequestBody } from './Models/login-request-body';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtResponseBody } from './Models/jwt-response-body';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { User } from '../../Users/Models/user';
import { ProfileResponseBody } from '../Profiles/Models/profile-response-body';
import { UsersService } from '../../Users/users.service';
import { RegisterRequestBody } from './Models/register-request-body';
import { HashService } from '../../Auth/hash.service';

@ApiTags('Account')
@Controller('/account')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
export class AccountController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private hashService: HashService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @Public()
  @Post('login')
  @ApiResponse({ status: 200, type: JwtResponseBody })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async login(@Body() loginRequestBody: LoginRequestBody) {
    const jwt = await this.authService.login(
      loginRequestBody.email,
      loginRequestBody.password,
    );
    return this.mapper.map(jwt, Jwt, JwtResponseBody);
  }

  @Public()
  @Post('register')
  @ApiResponse({ status: 200, type: ProfileResponseBody })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  async register(@Body() registerRequestBody: RegisterRequestBody) {
    const createUser: User = {
      ...registerRequestBody,
      _id: null,
      password: this.hashService.hash(registerRequestBody.password),
    };
    const user = await this.usersService.create(createUser);
    return this.mapper.map(user, User, ProfileResponseBody);
  }
}
