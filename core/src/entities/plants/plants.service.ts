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
  constructor(@InjectModel(Plant.name) private plantModel: Model<PlantDocument>) {
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

  async update(plant: Plant): Promise<Plant> {
    try {
      plant.updatedAt = new Date();
      await this.plantModel.updateOne(plant);
      return await this.findOneById(plant._id.toString());
    } catch (exception) {
      if (exception.code === 11000) {
        throw new ConflictException();
      }
      throw exception;
    }
  }

  async deletePlant(plantId: string): Promise<Plant | undefined> {
    try {
      return await this.plantModel.findByIdAndDelete(plantId);
    } catch {
      return null;
    }
  }

  async findOneById(id: string): Promise<Plant | undefined> {
    return await this.plantModel.findById(id);
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

    const elements = await this.plantModel.find(findParam).skip(pagination.offset).limit(pagination.limit);
    const count = await this.plantModel.count(findParam);
    return [elements, count];
  }

  async count(): Promise<number> {
    return await this.plantModel.estimatedDocumentCount();
  }
}
