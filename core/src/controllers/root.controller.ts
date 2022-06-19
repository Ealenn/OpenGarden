import { Controller, Get, Redirect } from '@nestjs/common';
import { Public } from '../auth/auth.module';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
@Public()
export class RootController {
  @Get()
  @Redirect('/swagger', 302)
  async root() {
    return;
  }
}
