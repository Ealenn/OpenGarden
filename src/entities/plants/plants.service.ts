import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Plant, PlantDocument } from './models/plant.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';
import { BaseSearchParams } from '../base.search.params';
import { BaseEntityService } from '../base.entity.service';

export class PlantSearchParams extends BaseSearchParams {
  commonName?: string;
  variety?: string;
  family?: string;
  origin?: string;
  precocity?: string;
  createdBy?: string;
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
    const { pagination, ...filters } = params;
    const findParam = this._generateFilters(filters);

    return await this.plantModel
      .find(findParam)
      .skip(pagination.offset)
      .limit(pagination.limit);
  }
}
