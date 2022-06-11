import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { PlantType, PlantTypeDocument } from './models/plant.type.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';
import { BaseSearchParams } from '../base.search.params';
import { BaseEntityService } from '../base.entity.service';

export class PlantTypeSearchParams extends BaseSearchParams {
  name?: string;
  kingdom?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
  binomialName?: string;
}

@Injectable()
export class PlanttypesService extends BaseEntityService {
  constructor(@InjectModel(PlantType.name) private PlantTypeModel: Model<PlantTypeDocument>) {
    super();
  }

  async create(PlantType: PlantType): Promise<PlantType> {
    try {
      PlantType._id = new mongoose.Types.ObjectId();
      return await this.PlantTypeModel.create(PlantType);
    } catch (exception) {
      if (exception.code === 11000) {
        throw new ConflictException();
      }
      throw exception;
    }
  }

  async findOneById(id: string): Promise<PlantType | undefined> {
    return await this.PlantTypeModel.findById(id);
  }

  async search(params: PlantTypeSearchParams): Promise<PlantType[]> {
    const { pagination, kingdom, order, family, genus, species, binomialName, ...filters } = params;
    let findParam = this._generateFilters(filters);
    findParam = this._generateFilter(findParam, 'classification.kingdom', kingdom);
    findParam = this._generateFilter(findParam, 'classification.order', order);
    findParam = this._generateFilter(findParam, 'classification.family', family);
    findParam = this._generateFilter(findParam, 'classification.genus', genus);
    findParam = this._generateFilter(findParam, 'classification.species', species);
    findParam = this._generateFilter(findParam, 'classification.binomialName', binomialName);

    return await this.PlantTypeModel.find(findParam).skip(pagination.offset).limit(pagination.limit);
  }
}
