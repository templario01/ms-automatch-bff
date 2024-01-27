import { Module } from '@nestjs/common';
import { EnvConfigModule } from '../config/env-config.module';
import { RedisClient } from './redis.client';

@Module({
  imports: [EnvConfigModule],
  exports: [RedisClient],
  providers: [RedisClient],
})
export class RedisModule {}
