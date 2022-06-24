import {
  Body,
  Request,
  Controller,
  Get,
  Response,
  NotFoundException,
  Param,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
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
import { Response as Res } from 'express';
import { Roles } from '../../auth/roles/roles.decorator';
import { Role } from '../../auth/roles/role.enum';
import { PublishedState } from '../../entities/base.published.entity';

@ApiBearerAuth()
@ApiTags('Plants')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService, @InjectMapper() private mapper: Mapper) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 201, type: PlantResponseBody })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorsRequestBody })
  async createPlant(@Request() req, @Body() createPlantRequestBody: CreatePlantRequestBody) {
    const createPlant: Plant = {
      ...createPlantRequestBody,
      _id: null,
      status: PublishedState.ONLINE,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user._id,
    };
    const plant = await this.plantsService.create(createPlant);
    return this.mapper.map(plant, Plant, PlantResponseBody);
  }

  @Delete(':plantId')
  @Roles(Role.ADMIN)
  @ApiResponse({ status: 403, description: 'Forbidden', type: ErrorsRequestBody })
  @ApiResponse({ status: 404, description: 'Not Found', type: ErrorsRequestBody })
  @ApiResponse({ status: 200, type: PlantResponseBody })
  async deletePlant(@Request() req, @Param('plantId') plantId: string) {
    const plant = await this.plantsService.deletePlant(plantId);
    if (!plant) {
      throw new NotFoundException();
    }

    return this.mapper.map(plant, Plant, PlantResponseBody);
  }

  @Get(':plantId')
  @ApiResponse({ status: 200, type: PlantResponseBody })
  @ApiResponse({ status: 404, description: 'Not Found', type: ErrorsRequestBody })
  async getPlantById(@Response() res: Res, @Param('plantId') plantId: string) {
    const plant = await this.plantsService.findOneById(plantId);
    if (!plant) {
      throw new NotFoundException();
    }

    const body = this.mapper.map(plant, Plant, PlantResponseBody);
    return res.set({ 'Content-Range': `elements 0-1/1` }).json(body);
  }

  @Get()
  @ApiResponse({ status: 200, type: PlantSearchResponseBody })
  async getPlants(@Response() res: Res, @Query() plantsSearchRequestQuery: PlantsSearchRequestQuery) {
    const { limit, offset, ...filters } = plantsSearchRequestQuery;
    const [elements, count] = await this.plantsService.search({
      pagination: {
        limit,
        offset,
      },
      ...filters,
    });

    const body: PlantSearchResponseBody = {
      plants: this.mapper.mapArray(elements, Plant, PlantResponseBody),
    };
    return res.set({ 'Content-Range': `elements ${offset}-${offset + limit}/${count}` }).json(body);
  }
}
