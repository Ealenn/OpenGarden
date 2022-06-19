import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Plant, PlantDocument } from './models/plant.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';
import { BaseSearchParams } from '../base.search.params';
import { BaseEntityService } from '../base.entity.service';

export class PlantSearchParams extends BaseSearchParams {
  name?: string;
  kingdom?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
  binomialName?: string;
}

@Injectable()
export class PlantsService extends BaseEntityService {
  constructor(@InjectModel(Plant.name) private PlantModel: Model<PlantDocument>) {
    super();
  }

  async create(Plant: Plant): Promise<Plant> {
    try {
      Plant._id = new mongoose.Types.ObjectId();
      return await this.PlantModel.create(Plant);
    } catch (exception) {
      if (exception.code === 11000) {
        throw new ConflictException();
      }
      throw exception;
    }
  }

  async findOneById(id: string): Promise<Plant | undefined> {
    return await this.PlantModel.findById(id);
  }

  async search(params: PlantSearchParams): Promise<[Plant[], number]> {
    const { pagination, kingdom, order, family, genus, species, binomialName, ...filters } = params;
    let findParam = this._generateFilters(filters);
    findParam = this._generateFilter(findParam, 'classification.kingdom', kingdom);
    findParam = this._generateFilter(findParam, 'classification.order', order);
    findParam = this._generateFilter(findParam, 'classification.family', family);
    findParam = this._generateFilter(findParam, 'classification.genus', genus);
    findParam = this._generateFilter(findParam, 'classification.species', species);
    findParam = this._generateFilter(findParam, 'classification.binomialName', binomialName);

    const elements = await this.PlantModel.find(findParam).skip(pagination.offset).limit(pagination.limit);
    const count = await this.PlantModel.count(findParam);
    return [elements, count];
  }
}
