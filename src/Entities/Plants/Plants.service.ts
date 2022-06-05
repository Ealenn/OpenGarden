import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Plant, PlantDocument } from './Models/plant';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';
import { BaseSearchParams } from '../base.search.params';
import { BaseEntityService } from '../base.entity.service';

export class PlantSearchParams extends BaseSearchParams {
  commonName?: string;
  variety?: string;
}

@Injectable()
export class PlantsService extends BaseEntityService {
  constructor(
    @InjectModel(Plant.name) private plantModel: Model<PlantDocument>,
  ) {
    super();
  }

  async create(plant: Plant): Promise<Plant> {
    try {
      plant._id = new mongoose.Types.ObjectId();
      return await this.plantModel.create(plant);
    } catch (exception) {
      if (exception.code === 11000) {
        throw new ConflictException();
      }
      throw exception;
    }
  }

  async findOneById(id: string): Promise<Plant | undefined> {
    return await this.plantModel.findOne({ id });
  }

  async search(params: PlantSearchParams): Promise<Plant[]> {
    let filters = {};

    if (params.commonName) {
      filters = {
        ...filters,
        commonName: {
          $regex: this._escapeStringRegex(params.commonName),
        },
      };
    }

    if (params.variety) {
      filters = {
        ...filters,
        variety: {
          $regex: this._escapeStringRegex(params.variety),
        },
      };
    }

    return await this.plantModel
      .find(filters)
      .skip(params.pagination.offset)
      .limit(params.pagination.limit);
  }
}
