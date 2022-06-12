import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Plant, PlantDocument } from './models/plant.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';
import { BaseSearchParams } from '../base.search.params';
import { BaseEntityService, EntityFilterOption } from '../base.entity.service';

export class PlantSearchParams extends BaseSearchParams {
  variety?: string;
  origin?: string;
  precocity?: string;
  createdBy?: string;
  sunNeed?: string;
  waterNeed?: string;
  floors?: string[];
  plantTypes?: string[];
  cultureTypes?: string[];
  minSpacingBetweenPlants?: number;
  maxSpacingBetweenPlants?: number;
  sowingPeriod?: number[];
  growingOnPeriod?: number[];
  harvestPeriod?: number[];
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
    const {
      pagination,
      sunNeed,
      waterNeed,
      floors,
      plantTypes,
      cultureTypes,
      minSpacingBetweenPlants,
      maxSpacingBetweenPlants,
      sowingPeriod,
      growingOnPeriod,
      harvestPeriod,
      ...filters
    } = params;

    let findParam = this._generateFilters(filters);
    findParam = this._generateFilter(findParam, 'requirement.water.needs', waterNeed);
    findParam = this._generateFilter(findParam, 'requirement.sun.needs', sunNeed);
    findParam = this._generateFilter(
      findParam,
      'requirement.floors',
      floors?.map((floor) => new mongoose.Types.ObjectId(floor)),
    );
    findParam = this._generateFilter(
      findParam,
      'plantType',
      plantTypes?.map((plantType) => new mongoose.Types.ObjectId(plantType)),
    );
    findParam = this._generateFilter(findParam, 'culture.cultureTypes', cultureTypes);
    findParam = this._generateFilter(
      findParam,
      'culture.spacingBetweenPlants',
      minSpacingBetweenPlants,
      EntityFilterOption.MIN,
    );
    findParam = this._generateFilter(
      findParam,
      'culture.spacingBetweenPlants',
      maxSpacingBetweenPlants,
      EntityFilterOption.MAX,
    );
    findParam = this._generateFilter(findParam, 'culture.sowingPeriod', sowingPeriod);
    findParam = this._generateFilter(findParam, 'culture.growingOnPeriod', growingOnPeriod);
    findParam = this._generateFilter(findParam, 'culture.harvestPeriod', harvestPeriod);
    return await this.plantModel.find(findParam).skip(pagination.offset).limit(pagination.limit);
  }
}
