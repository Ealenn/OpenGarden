import {
  Body,
  Request,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ApiResponse } from '@nestjs/swagger';
import { PlantsService } from '../../Entities/Plants/Plants.service';
import { Plant } from '../../Entities/Plants/Models/plant';
import { PlantResponseBody } from './Models/plant-response-body';
import { CreatePlantRequestBody } from './Models/create-plant-request-body';
import { PlantSearchResponseBody } from './Models/plants-search-response-body';
import { PlantsSearchRequestQuery } from './Models/plants-search-request-query';

@ApiBearerAuth()
@ApiTags('Plants')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('plants')
export class PlantsController {
  constructor(
    private plantsService: PlantsService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @Post()
  @ApiResponse({ status: 200, type: PlantResponseBody })
  async createPlant(
    @Request() req,
    @Body() createPlantRequestBody: CreatePlantRequestBody,
  ) {
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
    const plants = await this.plantsService.search({
      pagination: {
        limit: plantsSearchRequestQuery.limit,
        offset: plantsSearchRequestQuery.offset,
      },
      commonName: plantsSearchRequestQuery.commonName,
      variety: plantsSearchRequestQuery.variety,
    });
    const result: PlantSearchResponseBody = {
      plants: this.mapper.mapArray(plants, Plant, PlantResponseBody),
    };
    return result;
  }
}
