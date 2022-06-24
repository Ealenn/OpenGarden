import {
  Body,
  Request,
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Param,
  NotFoundException,
  Response,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorsRequestBody } from '../models/errors.response.body';
import { FavoritesService } from '../../entities/favorites/favorites.service';
import { CreateFavoriteVarietyRequestBody } from './models/favorite.variety.request.body';
import {
  FavoriteVarietyResponseBody,
  FavoriteVarietySearchResponseBody,
} from './models/favorite.response.body';
import { FavoriteVariety } from '../../entities/favorites/models/favorite.variety.entity';
import { FavoriteVarietiesSearchRequestQuery } from './models/favorite.variety.request.query';
import { Response as Res } from 'express';

@ApiBearerAuth()
@ApiTags('Favorites')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('favorites/varieties')
export class FavoritesVarietiesController {
  constructor(private favoritesService: FavoritesService, @InjectMapper() private mapper: Mapper) {}

  @Delete(':varietyId')
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Not Found', type: ErrorsRequestBody })
  async deleteFavorite(@Response() res: Res, @Request() req, @Param('varietyId') varietyId: string) {
    const favorite = await this.favoritesService.deleteVariety(varietyId, req.user);
    if (!favorite) {
      throw new NotFoundException();
    }

    const body = this.mapper.map(favorite, FavoriteVariety, FavoriteVarietyResponseBody);
    return res.set({ 'Content-Range': `elements 0-1/1` }).json(body);
  }

  @Post()
  @ApiResponse({ status: 201, type: FavoriteVarietyResponseBody })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorsRequestBody })
  async createFavorite(@Request() req, @Body() createFavoriteRequestBody: CreateFavoriteVarietyRequestBody) {
    const favorite = await this.favoritesService.addVariety(createFavoriteRequestBody.variety, req.user);
    return this.mapper.map(favorite, FavoriteVariety, FavoriteVarietyResponseBody);
  }

  @Get()
  @ApiResponse({ status: 200, type: FavoriteVarietySearchResponseBody })
  async getFavoritesVarieties(
    @Response() res: Res,
    @Query() favoritesSearchRequestQuery: FavoriteVarietiesSearchRequestQuery,
    @Request() req,
  ) {
    const { limit, offset, ...filters } = favoritesSearchRequestQuery;
    const [elements, count] = await this.favoritesService.getVarieties(
      {
        pagination: {
          limit,
          offset,
        },
        ...filters,
      },
      req.user,
    );
    const body: FavoriteVarietySearchResponseBody = {
      varieties: this.mapper.mapArray(elements, FavoriteVariety, FavoriteVarietyResponseBody),
    };
    return res.set({ 'Content-Range': `elements ${offset}-${offset + limit}/${count}` }).json(body);
  }

  @Get(':varietyId')
  @ApiResponse({ status: 200, type: FavoriteVarietyResponseBody })
  @ApiResponse({ status: 404, description: 'Not Found', type: ErrorsRequestBody })
  async getFavoriteVariety(@Response() res: Res, @Request() req, @Param('varietyId') varietyId: string) {
    const favorite = await this.favoritesService.getVariety(varietyId, req.user);
    if (!favorite) {
      throw new NotFoundException();
    }

    const body = this.mapper.map(favorite, FavoriteVariety, FavoriteVarietyResponseBody);
    return res.set({ 'Content-Range': `elements 0-1/1` }).json(body);
  }
}
