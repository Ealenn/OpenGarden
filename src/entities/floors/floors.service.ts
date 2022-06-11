import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Floor, FloorDocument } from './models/floor.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ConflictException } from '@nestjs/common';
import { BaseSearchParams } from '../base.search.params';
import { BaseEntityService } from '../base.entity.service';

export class FloorSearchParams extends BaseSearchParams {
  name?: string;
}

@Injectable()
export class FloorsService extends BaseEntityService {
  constructor(
    @InjectModel(Floor.name) private FloorModel: Model<FloorDocument>,
  ) {
    super();
  }

  async create(Floor: Floor): Promise<Floor> {
    try {
      Floor._id = new mongoose.Types.ObjectId();
      return await this.FloorModel.create(Floor);
    } catch (exception) {
      if (exception.code === 11000) {
        throw new ConflictException();
      }
      throw exception;
    }
  }

  async findOneById(id: string): Promise<Floor | undefined> {
    return await this.FloorModel.findById(id);
  }

  async search(params: FloorSearchParams): Promise<Floor[]> {
    const { pagination, ...filters } = params;
    const findParam = this._generateFilters(filters);

    return await this.FloorModel.find(findParam)
      .skip(pagination.offset)
      .limit(pagination.limit);
  }
}
