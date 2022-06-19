import {
  Body,
  Request,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Response,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ApiResponse } from '@nestjs/swagger';
import { FloorsService } from '../../entities/floors/floors.service';
import { Floor } from '../../entities/floors/models/floor.entity';
import { FloorResponseBody, FloorSearchResponseBody } from './models/floor.response.body';
import { CreateFloorRequestBody } from './models/floor.request.body';
import { FloorsSearchRequestQuery } from './models/floor.request.query';
import { ErrorsRequestBody } from '../models/errors.response.body';
import { Response as Res } from 'express';

@ApiBearerAuth()
@ApiTags('Floors')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('floors')
export class FloorsController {
  constructor(private floorsService: FloorsService, @InjectMapper() private mapper: Mapper) {}

  @Post()
  @ApiResponse({ status: 201, type: FloorResponseBody })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorsRequestBody,
  })
  async createFloor(@Request() req, @Body() createFloorRequestBody: CreateFloorRequestBody) {
    const createFloor: Floor = {
      ...createFloorRequestBody,
      _id: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user._id,
    };
    const floor = await this.floorsService.create(createFloor);
    return this.mapper.map(floor, Floor, FloorResponseBody);
  }

  @Get(':floorId')
  @ApiResponse({ status: 200, type: FloorResponseBody })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
    type: ErrorsRequestBody,
  })
  async getFloorById(@Param('floorId') floorId: string) {
    const floor = await this.floorsService.findOneById(floorId);
    if (!floor) {
      throw new NotFoundException();
    }
    return this.mapper.map(floor, Floor, FloorResponseBody);
  }

  @Get()
  @ApiResponse({ status: 200, type: FloorSearchResponseBody })
  async getFloors(@Response() res: Res, @Query() floorsSearchRequestQuery: FloorsSearchRequestQuery) {
    const { limit, offset, ...filters } = floorsSearchRequestQuery;
    const [elements, count] = await this.floorsService.search({
      pagination: {
        limit,
        offset,
      },
      ...filters,
    });
    const body: FloorSearchResponseBody = {
      floors: this.mapper.mapArray(elements, Floor, FloorResponseBody),
    };
    return res
      .set({
        'Content-Range': `elements ${offset}-${offset + limit}/${count}`,
      })
      .json(body);
  }
}
