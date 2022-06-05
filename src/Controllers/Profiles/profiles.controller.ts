import {
  Controller,
  Get,
  Request,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UsersService } from '../../Users/users.service';
import { User } from '../../Users/Models/user';
import { ProfileResponseBody } from './Models/profile-response-body';
import { ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Profiles')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('profiles')
export class ProfilesController {
  constructor(
    private usersService: UsersService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @Get('me')
  @ApiResponse({ status: 200, type: ProfileResponseBody })
  getMyProfile(@Request() req) {
    return this.mapper.map(req.user, User, ProfileResponseBody);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: ProfileResponseBody })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async getProfile(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.mapper.map(user, User, ProfileResponseBody);
  }
}
