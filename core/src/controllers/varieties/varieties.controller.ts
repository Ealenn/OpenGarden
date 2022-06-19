import { Body, Request, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ApiResponse } from '@nestjs/swagger';
import { VarietiesService } from '../../entities/varieties/varieties.service';
import { Variety } from '../../entities/varieties/models/variety.entity';
import { VarietyResponseBody, VarietySearchResponseBody } from './models/variety.response.body';
import { CreateVarietyRequestBody } from './models/variety.request.body';
import { VarietiesSearchRequestQuery } from './models/variety.request.query';
import mongoose from 'mongoose';
import { ErrorsRequestBody } from '../models/errors.response.body';

@ApiBearerAuth()
@ApiTags('Varieties')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('varieties')
export class VarietiesController {
  constructor(private plantsService: VarietiesService, @InjectMapper() private mapper: Mapper) {}

  @Post()
  @ApiResponse({ status: 201, type: VarietyResponseBody })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorsRequestBody,
  })
  async createVariety(@Request() req, @Body() createVarietyRequestBody: CreateVarietyRequestBody) {
    const createVariety: Variety = {
      ...createVarietyRequestBody,
      _id: null,
      plant: new mongoose.Types.ObjectId(createVarietyRequestBody.plant),
      requirement: {
        ...createVarietyRequestBody.requirement,
        floors: createVarietyRequestBody.requirement.floors.map(
          (floor) => new mongoose.Types.ObjectId(floor),
        ),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user._id,
    };
    const plant = await this.plantsService.create(createVariety);
    return this.mapper.map(plant, Variety, VarietyResponseBody);
  }

  @Get(':varietyId')
  @ApiResponse({ status: 200, type: VarietyResponseBody })
  async getVarietyById(@Param('varietyId') varietyId: string) {
    const plant = await this.plantsService.findOneById(varietyId);
    if (!plant) {
      throw new NotFoundException();
    }
    return this.mapper.map(plant, Variety, VarietyResponseBody);
  }

  @Get()
  @ApiResponse({ status: 200, type: VarietySearchResponseBody })
  async getVarieties(@Query() plantsSearchRequestQuery: VarietiesSearchRequestQuery) {
    const { limit, offset, ...filters } = plantsSearchRequestQuery;
    const plants = await this.plantsService.search({
      pagination: {
        limit,
        offset,
      },
      ...filters,
    });
    const result: VarietySearchResponseBody = {
      varieties: this.mapper.mapArray(plants, Variety, VarietyResponseBody),
    };
    return result;
  }
}
