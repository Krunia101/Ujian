import { Injectable } from '@nestjs/common';
import { get } from 'https';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Worlds';
  }
}
