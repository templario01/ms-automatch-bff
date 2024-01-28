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
      host: this.configService.get<string>('REDIS_HOST'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
      port: this.configService.get<number>('REDIS_PORT'),
    };
  }
  get inventory() {
    return {
      url: this.configService.get<string>('INVENTORY_API_URL'),
    };
  }
}
