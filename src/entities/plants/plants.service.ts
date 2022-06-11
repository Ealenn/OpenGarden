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
  sunNeed?: string;
  waterNeed?: string;
  floors?: string[];
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

  async findOneById(id: string): Promise<Plant | undefined> {
    return await this.plantModel.findById(id);
  }

  async search(params: PlantSearchParams): Promise<Plant[]> {
    const { pagination, sunNeed, waterNeed, floors, ...filters } = params;
    let findParam = this._generateFilters(filters);
    findParam = this._generateFilter(findParam, 'requirement.water.needs', waterNeed);
    findParam = this._generateFilter(findParam, 'requirement.sun.needs', sunNeed);
    findParam = this._generateFilter(
      findParam,
      'requirement.floors',
      floors?.map((floor) => new mongoose.Types.ObjectId(floor)),
    );

    return await this.plantModel.find(findParam).skip(pagination.offset).limit(pagination.limit);
  }
}
