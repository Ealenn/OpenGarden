import { Body, Request, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ApiResponse } from '@nestjs/swagger';
import { PlantsService } from '../../entities/plants/plants.service';
import { Plant } from '../../entities/plants/models/plant.entity';
import { PlantResponseBody, PlantSearchResponseBody } from './models/plant.response.body';
import { CreatePlantRequestBody } from './models/plant.request.body';
import { PlantsSearchRequestQuery } from './models/plant.request.query';
import { ErrorsRequestBody } from '../models/errors.response.body';

@ApiBearerAuth()
@ApiTags('Plants')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService, @InjectMapper() private mapper: Mapper) {}

  @Post()
  @ApiResponse({ status: 201, type: PlantResponseBody })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorsRequestBody,
  })
  async createPlant(@Request() req, @Body() createPlantRequestBody: CreatePlantRequestBody) {
    const createPlant: Plant = {
      ...createPlantRequestBody,
      _id: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user._id,
    };
    const plant = await this.plantsService.create(createPlant);
    return this.mapper.map(plant, Plant, PlantResponseBody);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: PlantResponseBody })
  async getPlantById(@Param('id') id: string) {
    const plant = await this.plantsService.findOneById(id);
    if (!plant) {
      throw new NotFoundException();
    }
    return this.mapper.map(plant, Plant, PlantResponseBody);
  }

  @Get()
  @ApiResponse({ status: 200, type: PlantSearchResponseBody })
  async getPlants(@Query() plantsSearchRequestQuery: PlantsSearchRequestQuery) {
    const { limit, offset, ...filters } = plantsSearchRequestQuery;
    const plants = await this.plantsService.search({
      pagination: {
        limit,
        offset,
      },
      ...filters,
    });
    const result: PlantSearchResponseBody = {
      plant: this.mapper.mapArray(plants, Plant, PlantResponseBody),
    };
    return result;
  }
}
