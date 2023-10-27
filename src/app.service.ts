import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  GetPong(): string {
    return 'pong';
  }
}
