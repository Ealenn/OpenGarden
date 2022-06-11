import { Body, Request, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ApiResponse } from '@nestjs/swagger';
import { PlanttypesService } from '../../entities/plant.types/plant.types.service';
import { PlantType } from '../../entities/plant.types/models/plant.type.entity';
import { PlantTypeResponseBody, PlantTypeSearchResponseBody } from './models/plant.type.response.body';
import { CreatePlantTypeRequestBody } from './models/plant.type.request.body';
import { PlantTypesSearchRequestQuery } from './models/plant.type.request.query';
import { ErrorsRequestBody } from '../models/errors.response.body';

@ApiBearerAuth()
@ApiTags('PlantTypes')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('plantTypes')
export class PlantTypesController {
  constructor(private plantTypesService: PlanttypesService, @InjectMapper() private mapper: Mapper) {}

  @Post()
  @ApiResponse({ status: 201, type: PlantTypeResponseBody })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorsRequestBody,
  })
  async createPlantType(@Request() req, @Body() createPlantTypeRequestBody: CreatePlantTypeRequestBody) {
    const createPlantType: PlantType = {
      ...createPlantTypeRequestBody,
      _id: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user._id,
    };
    const plantType = await this.plantTypesService.create(createPlantType);
    return this.mapper.map(plantType, PlantType, PlantTypeResponseBody);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: PlantTypeResponseBody })
  async getPlantTypeById(@Param('id') id: string) {
    const plantType = await this.plantTypesService.findOneById(id);
    if (!plantType) {
      throw new NotFoundException();
    }
    return this.mapper.map(plantType, PlantType, PlantTypeResponseBody);
  }

  @Get()
  @ApiResponse({ status: 200, type: PlantTypeSearchResponseBody })
  async getPlantTypes(@Query() plantTypesSearchRequestQuery: PlantTypesSearchRequestQuery) {
    const { limit, offset, ...filters } = plantTypesSearchRequestQuery;
    const plantTypes = await this.plantTypesService.search({
      pagination: {
        limit,
        offset,
      },
      ...filters,
    });
    const result: PlantTypeSearchResponseBody = {
      plantType: this.mapper.mapArray(plantTypes, PlantType, PlantTypeResponseBody),
    };
    return result;
  }
}
