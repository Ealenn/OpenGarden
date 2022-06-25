import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { VarietiesService } from '../../entities/varieties/varieties.service';
import { UsersService } from '../../users/users.service';
import { PlantsService } from '../../entities/plants/plants.service';
import { FloorsService } from '../../entities/floors/floors.service';
import { StatsGlobalResponseBody } from './models/stats.global.response.body';

@ApiBearerAuth()
@ApiTags('Stats')
@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 429, description: 'Too Many Requests' })
@Controller('stats')
export class StatsController {
  constructor(
    private usersService: UsersService,
    private plantsService: PlantsService,
    private varietiesService: VarietiesService,
    private floorsService: FloorsService,
  ) {}

  @Get('global')
  @ApiResponse({ status: 200, type: StatsGlobalResponseBody })
  async getGlobal(): Promise<StatsGlobalResponseBody> {
    return {
      estimatedCount: {
        users: await this.usersService.count(),
        plants: await this.plantsService.count(),
        varieties: await this.varietiesService.count(),
        floors: await this.floorsService.count(),
      },
    };
  }
}
