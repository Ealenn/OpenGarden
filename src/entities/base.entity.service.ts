export class BaseEntityService {
  /**
   * @see https://github.com/sindresorhus/escape-string-regexp
   */
  protected _escapeStringRegex(string: string): string {
    return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
  }
}
