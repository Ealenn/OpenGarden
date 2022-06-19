import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { VarietiesService } from '../../../entities/varieties/varieties.service';

@ValidatorConstraint({ name: 'VarietyExists', async: true })
@Injectable()
export class VarietyExistsRule implements ValidatorConstraintInterface {
  private readonly regex = new RegExp('^[0-9a-fA-F]{24}$');
  constructor(private varietiesService: VarietiesService) {}

  async validate(value: string) {
    try {
      if (!value.match(this.regex)) {
        return false;
      }
      return this._validateVariety(value);
    } catch (e) {
      return false;
    }
  }

  private async _validateVariety(id: string): Promise<boolean> {
    const result = await this.varietiesService.findOneById(id);
    if (result) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `Variety ${args.value} doesn't exist`;
  }
}
