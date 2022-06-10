export class BaseEntityService {
  /**
   * @see https://github.com/sindresorhus/escape-string-regexp
   */
  protected _escapeStringRegex(string: string): string {
    return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
  }

  /**
   * Generate MongoDB Document Filters
   * @param {Record<string, any>} filters { filterKey: "data" }
   * @returns {any} { filterKey: { $regex: 'data' } }
   */
  protected _generateFilters(filters: Record<string, any>): any {
    const result = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value && typeof value === 'string') {
        result[key] = {
          $regex: this._escapeStringRegex(value),
        };
      }
    }
    return result;
  }
}
