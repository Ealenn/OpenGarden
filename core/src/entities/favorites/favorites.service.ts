import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { FavoriteVariety, FavoriteVarietyDocument } from './models/favorite.variety.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';
import { BaseEntityService } from '../base.entity.service';
import { User } from '../../users/models/user.entity';
import { BaseSearchParams } from '../base.search.params';

export class FavoritesSearchParams extends BaseSearchParams {}

@Injectable()
export class FavoritesService extends BaseEntityService {
  constructor(
    @InjectModel(FavoriteVariety.name) private favoriteVarietyModel: Model<FavoriteVarietyDocument>,
  ) {
    super();
  }

  async addVariety(varietyId: string, user: User): Promise<FavoriteVariety> {
    try {
      const favorite: FavoriteVariety = {
        _id: new Types.ObjectId(),
        variety: new Types.ObjectId(varietyId),
        compositeKey: `${user._id.toString()}${varietyId}`,
        createdBy: user._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return await this.favoriteVarietyModel.create(favorite);
    } catch (exception) {
      if (exception.code === 11000) {
        throw new ConflictException();
      }
      throw exception;
    }
  }

  async deleteVariety(varietyId: string, user: User): Promise<FavoriteVariety> {
    let filters = {};
    filters = this._generateFilter(filters, 'createdBy', user._id);
    filters = this._generateFilter(filters, 'variety', new Types.ObjectId(varietyId));
    filters = this._generateFilter(filters, 'compositeKey', `${user._id.toString()}${varietyId}`);
    return await this.favoriteVarietyModel.remove(filters).limit(1);
  }

  async getVarieties(params: FavoritesSearchParams, user: User): Promise<FavoriteVariety[]> {
    const { pagination } = params;
    const findParam = this._generateFilters({
      createdBy: user._id,
    });

    return await this.favoriteVarietyModel.find(findParam).skip(pagination.offset).limit(pagination.limit);
  }

  async getVariety(varietyId: string, user: User): Promise<FavoriteVariety> {
    let filters = {};
    filters = this._generateFilter(filters, 'createdBy', user._id);
    filters = this._generateFilter(filters, 'variety', new Types.ObjectId(varietyId));
    filters = this._generateFilter(filters, 'compositeKey', `${user._id.toString()}${varietyId}`);
    return await this.favoriteVarietyModel.findOne(filters);
  }
}
