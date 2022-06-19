import { Controller, Get, Request, Param, NotFoundException, Response } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/models/user.entity';
import { ProfileResponseBody } from './models/profile.response.body';
import { ApiResponse } from '@nestjs/swagger';
import { Response as Res } from 'express';

@ApiBearerAuth()
@ApiTags('Profiles')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('profiles')
export class ProfilesController {
  constructor(private usersService: UsersService, @InjectMapper() private mapper: Mapper) {}

  @Get('me')
  @ApiResponse({ status: 200, type: ProfileResponseBody })
  getMyProfile(@Response() res: Res, @Request() req) {
    return res
      .set({
        'Content-Range': `elements 0-1/1`,
      })
      .json(this.mapper.map(req.user, User, ProfileResponseBody));
  }

  @Get(':profileId')
  @ApiResponse({ status: 200, type: ProfileResponseBody })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async getProfile(@Response() res: Res, @Param('profileId') profileId: string) {
    const user = await this.usersService.findOneById(profileId);
    if (!user) {
      throw new NotFoundException();
    }
    return res
      .set({
        'Content-Range': `elements 0-1/1`,
      })
      .json(this.mapper.map(user, User, ProfileResponseBody));
  }
}
