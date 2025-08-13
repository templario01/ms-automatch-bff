import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private readonly configService: ConfigService) {}

  get app() {
    return {
      port: this.configService.get<number>('PORT'),
      environment: this.configService.get<string>('NODE_ENV'),
    };
  }
  get redis() {
    return {
      url: this.configService.get<string>('REDIS_URL'),
    };
  }
  get inventory() {
    return {
      url: this.configService.get<string>('INVENTORY_API_URL'),
    };
  }
  get account() {
    return {
      url: this.configService.get<string>('ACCOUNT_API_URL'),
    };
  }
}
