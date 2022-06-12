import mongoose from 'mongoose';

export interface mongoSearchObject {
  $regex?: string;
  $in?: string[];
  $elemMatch?: any;
  $contains?: string[];
  $lte?: number;
  $gte?: number;
}

export enum EntityFilterOption {
  MIN = 'MIN',
  MAX = 'MAX',
}

export class BaseEntityService {
  /**
   * Escape RegExp special characters
   * @see https://github.com/sindresorhus/escape-string-regexp
   */
  protected _escapeStringRegex(string: string): string {
    return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
  }

  /**
   * Generate MongoDB Document Filters
   * @param {Record<string, any>} filters { filterKey: "data", filterUndefined: undefined }
   * @returns {Record<string, mongoSearchObject>} { filterKey: { $regex: 'data' } }
   */
  protected _generateFilters(filters: Record<string, any>): Record<string, mongoSearchObject> {
    let result = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value && typeof value === 'string') {
        result = this._generateFilter(result, key, value);
      }
    }
    return result;
  }

  /**
   * Generate MongoDB Document Filter
   * @returns {Record<string, mongoSearchObject>} { key: { $regex: 'value' } }
   */
  protected _generateFilter(
    filters: Record<string, mongoSearchObject>,
    key: string,
    value: string | string[] | mongoose.Types.ObjectId | mongoose.Types.ObjectId[] | number | number[],
    option?: EntityFilterOption,
  ): Record<string, mongoSearchObject> | null {
    if (!value || (Array.isArray(value) && value.length == 0)) {
      return filters;
    }

    const result = { ...filters };
    const regexObject = this._generateRegexObject(value, option);
    if (!regexObject) {
      return filters;
    }

    if (result[key]) {
      result[key] = Object.assign({}, result[key], regexObject);
    } else {
      result[key] = regexObject;
    }

    return result;
  }

  /**
   * Generate MongoDB Regex Object
   * @returns {mongoSearchObject} { $regex: 'data' }
   */
  protected _generateRegexObject(
    value: string | string[] | mongoose.Types.ObjectId | mongoose.Types.ObjectId[] | number | number[],
    option?: EntityFilterOption,
  ): mongoSearchObject | null {
    switch (typeof value) {
      case 'string':
        const stringRegexObject: mongoSearchObject = {
          $regex: this._escapeStringRegex(value),
        };
        return stringRegexObject;
      case 'number':
        if (option) {
          if (option === EntityFilterOption.MIN) {
            const numberMinRegexObject: mongoSearchObject = {
              $gte: value,
            };
            return numberMinRegexObject;
          }
          if (option === EntityFilterOption.MAX) {
            const numberMaxRegexObject: mongoSearchObject = {
              $lte: value,
            };
            return numberMaxRegexObject;
          }
        } else {
          const numberRegexObject: mongoSearchObject = {
            $regex: value.toString(),
          };
          return numberRegexObject;
        }
      case 'object':
        const arrayRegexObject: mongoSearchObject = {
          $elemMatch: {
            $in: value,
          },
        };
        return arrayRegexObject;
      default:
        return null;
    }
  }
}
