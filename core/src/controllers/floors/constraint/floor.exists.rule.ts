import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { FloorsService } from '../../../entities/floors/floors.service';

@ValidatorConstraint({ name: 'FloorExists', async: true })
@Injectable()
export class FloorExistsRule implements ValidatorConstraintInterface {
  private readonly regex = new RegExp('^[0-9a-fA-F]{24}$');
  constructor(private floorsService: FloorsService) {}

  async validate(value: string) {
    try {
      if (!value.match(this.regex)) {
        return false;
      }
      return this._validateFloor(value);
    } catch (e) {
      return false;
    }
  }

  private async _validateFloor(id: string): Promise<boolean> {
    const result = await this.floorsService.findOneById(id);
    if (result) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `Floor ${args.value} doesn't exist`;
  }
}
