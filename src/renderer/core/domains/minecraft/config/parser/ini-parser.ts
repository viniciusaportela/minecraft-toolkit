import { EmptyWriter } from './empty-writer';

export class IniParser {
  static parse(rawData: any) {
    return {};
  }

  // TODO add better validation
  static async isFileValid(path: string) {
    return { isValid: true };
  }

  static getWriter(path: string) {
    return new EmptyWriter();
  }
}