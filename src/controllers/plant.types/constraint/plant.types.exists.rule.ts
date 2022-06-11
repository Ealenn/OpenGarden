import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PlanttypesService } from '../../../entities/plant.types/plant.types.service';

@ValidatorConstraint({ name: 'PlantTypeExists', async: true })
@Injectable()
export class PlantTypeExistsRule implements ValidatorConstraintInterface {
  private readonly regex = new RegExp('^[0-9a-fA-F]{24}$');
  constructor(private planttypesService: PlanttypesService) {}

  async validate(value: string) {
    try {
      if (!value.match(this.regex)) {
        return false;
      }
      return this._validatePlantType(value);
    } catch (e) {
      return false;
    }
  }

  private async _validatePlantType(id: string): Promise<boolean> {
    const result = await this.planttypesService.findOneById(id);
    if (!result) {
      throw new Error('PlantType not found');
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `PlantType ${args.value} doesn't exist`;
  }
}
