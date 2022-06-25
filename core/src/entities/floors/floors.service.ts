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
  constructor(@InjectModel(Floor.name) private floorModel: Model<FloorDocument>) {
    super();
  }

  async create(floor: Floor): Promise<Floor> {
    try {
      floor._id = new mongoose.Types.ObjectId();
      return await this.floorModel.create(floor);
    } catch (exception) {
      if (exception.code === 11000) {
        throw new ConflictException();
      }
      throw exception;
    }
  }

  async update(floor: Floor): Promise<Floor> {
    try {
      floor.updatedAt = new Date();
      await this.floorModel.updateOne(floor);
      return await this.findOneById(floor._id.toString());
    } catch (exception) {
      if (exception.code === 11000) {
        throw new ConflictException();
      }
      throw exception;
    }
  }

  async deleteFloor(floorId: string): Promise<Floor | undefined> {
    try {
      return await this.floorModel.findByIdAndDelete(floorId);
    } catch {
      return null;
    }
  }

  async findOneById(id: string): Promise<Floor | undefined> {
    return await this.floorModel.findById(id);
  }

  async search(params: FloorSearchParams): Promise<[Floor[], number]> {
    const { pagination, ...filters } = params;
    const findParam = this._generateFilters(filters);

    const elements = await this.floorModel.find(findParam).skip(pagination.offset).limit(pagination.limit);
    const count = await this.floorModel.count(findParam);
    return [elements, count];
  }

  async count(): Promise<number> {
    return await this.floorModel.estimatedDocumentCount();
  }
}
