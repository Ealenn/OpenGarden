export interface regexObject {
  $regex: string;
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
   * @returns {Record<string, regexObject>} { filterKey: { $regex: 'data' } }
   */
  protected _generateFilters(
    filters: Record<string, any>,
  ): Record<string, regexObject> {
    const result = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value && typeof value === 'string') {
        const regexObject: regexObject = {
          $regex: this._escapeStringRegex(value),
        };
        result[key] = regexObject;
      }
    }
    return result;
  }
}
