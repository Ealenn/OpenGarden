import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Garden, GardenDocument } from './models/garden.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';
import { BaseSearchParams } from '../base.search.params';
import { BaseEntityService } from '../base.entity.service';

export class GardenSearchParams extends BaseSearchParams {
  name?: string;
}

@Injectable()
export class GardensService extends BaseEntityService {
  constructor(@InjectModel(Garden.name) private plantModel: Model<GardenDocument>) {
    super();
  }

  async create(plant: Garden): Promise<Garden> {
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

  async update(plant: Garden): Promise<Garden> {
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

  async deleteGarden(plantId: string): Promise<Garden | undefined> {
    try {
      return await this.plantModel.findByIdAndDelete(plantId);
    } catch {
      return null;
    }
  }

  async findOneById(id: string): Promise<Garden | undefined> {
    return await this.plantModel.findById(id);
  }

  async search(params: GardenSearchParams): Promise<[Garden[], number]> {
    const { pagination, ...filters } = params;
    const findParam = this._generateFilters(filters);

    const elements = await this.plantModel.find(findParam).skip(pagination.offset).limit(pagination.limit);
    const count = await this.plantModel.count(findParam);
    return [elements, count];
  }

  async count(): Promise<number> {
    return await this.plantModel.estimatedDocumentCount();
  }
}
