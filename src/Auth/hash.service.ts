import { Injectable } from '@nestjs/common';
import { hashSync, compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashService {
  constructor(private configService: ConfigService) {}

  hash(text: string): string {
    return hashSync(text, this.configService.getOrThrow<number>('hash.salt'));
  }

  compare(data: string, encrypted: string): boolean {
    return compareSync(data, encrypted);
  }
}
