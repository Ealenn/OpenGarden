import { Module } from '@nestjs/common';
import { GardensService } from './gardens.service';

@Module({
  providers: [GardensService],
})
export class GardensModule {}
