import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Garden, GardenDocument } from '../gardens/models/garden.entity';
import { Variety, VarietyDocument } from '../varieties/models/variety.entity';
import { InjectModel } from '@nestjs/mongoose';
import { BaseEntityService } from '../base.entity.service';
import { Calendar, CalendarItem } from './calendars.model';
import { FavoriteVariety, FavoriteVarietyDocument } from '../favorites/models/favorite.variety.entity';
import { User } from '../../users/models/user.entity';

@Injectable()
export class CalendarsService extends BaseEntityService {
  constructor(
    @InjectModel(Variety.name) private varietyModel: Model<VarietyDocument>,
    @InjectModel(Garden.name) private plantModel: Model<GardenDocument>,
    @InjectModel(FavoriteVariety.name) private favoriteVarietyModel: Model<FavoriteVarietyDocument>,
  ) {
    super();
  }

  async search(user: User): Promise<Calendar> {
    const favorites = (await this.favoriteVarietyModel
      .find({
        createdBy: user._id,
      })
      .populate('variety', {
        id: true,
        plant: true,
        culture: { sowingPeriod: true, growingOnPeriod: true, harvestPeriod: true },
      })) as any;

    return {
      items: favorites.map((favorite) => {
        const item: CalendarItem = {
          plant: favorite.variety[0].plant.toString(),
          variety: favorite.variety[0].id.toString(),
          sowingPeriod: favorite.variety[0].culture.sowingPeriod,
          growingOnPeriod: favorite.variety[0].culture.growingOnPeriod,
          harvestPeriod: favorite.variety[0].culture.harvestPeriod,
        };
        return item;
      }),
    };
  }
}
