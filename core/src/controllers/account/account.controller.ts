import { Controller, Body, Post, HttpCode } from '@nestjs/common';
import { Public } from '../../auth/auth.module';
import { Jwt } from '../../auth/models/jwt';
import { AuthService } from '../../auth/auth.service';
import { LoginRequestBody } from './models/login.request.body';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtResponseBody } from './models/jwt.response.body';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { User } from '../../users/models/user.entity';
import { ProfileResponseBody } from '../profiles/models/profile.response.body';
import { UsersService } from '../../users/users.service';
import { RegisterRequestBody } from './models/register.request.body';
import { HashService } from '../../auth/hash.service';
import { ErrorsRequestBody } from '../models/errors.response.body';
import { Role } from '../../auth/roles/role.enum';

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
  @HttpCode(200)
  @ApiResponse({ status: 200, type: JwtResponseBody })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorsRequestBody,
  })
  async login(@Body() loginRequestBody: LoginRequestBody) {
    const jwt = await this.authService.login(loginRequestBody.email, loginRequestBody.password);
    return this.mapper.map(jwt, Jwt, JwtResponseBody);
  }

  @Public()
  @Post('register')
  @ApiResponse({ status: 201, type: ProfileResponseBody })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorsRequestBody })
  @ApiResponse({ status: 409, description: 'Conflict' })
  async register(@Body() registerRequestBody: RegisterRequestBody) {
    const createUser: User = {
      ...registerRequestBody,
      _id: null,
      roles: [Role.USER],
      password: this.hashService.hash(registerRequestBody.password),
    };
    const user = await this.usersService.create(createUser);
    return this.mapper.map(user, User, ProfileResponseBody);
  }
}
