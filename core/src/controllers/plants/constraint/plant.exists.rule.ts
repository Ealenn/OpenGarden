import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PlantsService } from '../../../entities/plants/plants.service';

@ValidatorConstraint({ name: 'PlantExists', async: true })
@Injectable()
export class PlantExistsRule implements ValidatorConstraintInterface {
  private readonly regex = new RegExp('^[0-9a-fA-F]{24}$');
  constructor(private plantsService: PlantsService) {}

  async validate(value: string) {
    try {
      if (!value.match(this.regex)) {
        return false;
      }
      return this._validatePlant(value);
    } catch (e) {
      return false;
    }
  }

  private async _validatePlant(id: string): Promise<boolean> {
    const result = await this.plantsService.findOneById(id);
    if (result) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `Plant ${args.value} doesn't exist`;
  }
}
