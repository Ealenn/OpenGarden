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
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ApiResponse } from '@nestjs/swagger';
import { VarietiesService } from '../../entities/varieties/varieties.service';
import { Variety } from '../../entities/varieties/models/variety.entity';
import { VarietyResponseBody, VarietySearchResponseBody } from './models/variety.response.body';
import { CreateVarietyRequestBody, UpdateVarietyRequestBody } from './models/variety.request.body';
import { VarietiesSearchRequestQuery } from './models/variety.request.query';
import mongoose, { Types } from 'mongoose';
import { ErrorsRequestBody } from '../models/errors.response.body';
import { Roles } from '../../auth/roles/roles.decorator';
import { Role } from '../../auth/roles/role.enum';
import { PublishedState } from '../../entities/base.published.entity';
import { Response as Res } from 'express';

@ApiBearerAuth()
@ApiTags('Varieties')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('varieties')
export class VarietiesController {
  constructor(private varietiesService: VarietiesService, @InjectMapper() private mapper: Mapper) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 201, type: VarietyResponseBody })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorsRequestBody })
  async createVariety(@Request() req, @Body() createVarietyRequestBody: CreateVarietyRequestBody) {
    const createVariety: Variety = {
      ...createVarietyRequestBody,
      _id: null,
      status: PublishedState.ONLINE,
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
    const plant = await this.varietiesService.create(createVariety);
    return this.mapper.map(plant, Variety, VarietyResponseBody);
  }

  @Put(':varietyId')
  @Roles(Role.ADMIN)
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, type: VarietyResponseBody })
  async updateVariety(
    @Request() req,
    @Param('varietyId') varietyId: string,
    @Body() updateVarietyRequestBody: UpdateVarietyRequestBody,
  ) {
    const variety = await this.varietiesService.findOneById(varietyId);
    if (!variety) {
      throw new NotFoundException();
    }

    variety.plant = new Types.ObjectId(updateVarietyRequestBody.plant);
    variety.name = updateVarietyRequestBody.name;
    variety.description = updateVarietyRequestBody.description;
    variety.origin = updateVarietyRequestBody.origin;
    variety.culture = updateVarietyRequestBody.culture;
    variety.requirement = {
      ...updateVarietyRequestBody.requirement,
      floors: updateVarietyRequestBody.requirement.floors.map((floor) => new mongoose.Types.ObjectId(floor)),
    };
    variety.precocity = updateVarietyRequestBody.precocity;

    const newPlant = await this.varietiesService.update(variety);
    return this.mapper.map(newPlant, Variety, VarietyResponseBody);
  }

  @Delete(':varietyId')
  @Roles(Role.ADMIN)
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 200, type: VarietyResponseBody })
  async deleteVariety(@Request() req, @Param('varietyId') varietyId: string) {
    const variety = await this.varietiesService.delete(varietyId);
    if (!variety) {
      throw new NotFoundException();
    }

    return this.mapper.map(variety, Variety, VarietyResponseBody);
  }

  @Get(':varietyId')
  @ApiResponse({ status: 200, type: VarietyResponseBody })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async getVarietyById(@Response() res: Res, @Param('varietyId') varietyId: string) {
    const plant = await this.varietiesService.findOneById(varietyId);
    if (!plant) {
      throw new NotFoundException();
    }

    const body = this.mapper.map(plant, Variety, VarietyResponseBody);
    return res.set({ 'Content-Range': `elements 0-1/1` }).json(body);
  }

  @Get()
  @ApiResponse({ status: 200, type: VarietySearchResponseBody })
  async getVarieties(@Response() res: Res, @Query() plantsSearchRequestQuery: VarietiesSearchRequestQuery) {
    const { limit, offset, ...filters } = plantsSearchRequestQuery;
    const [elements, count] = await this.varietiesService.search({
      pagination: {
        limit,
        offset,
      },
      ...filters,
    });
    const body: VarietySearchResponseBody = {
      varieties: this.mapper.mapArray(elements, Variety, VarietyResponseBody),
    };
    return res.set({ 'Content-Range': `elements ${offset}-${offset + limit}/${count}` }).json(body);
  }
}
