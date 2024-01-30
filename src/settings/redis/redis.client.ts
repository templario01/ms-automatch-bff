import { Injectable, Logger } from '@nestjs/common';
import { EnvConfigService } from '../config/env-config.service';
import * as Keyv from 'keyv';
import { KeyvAdapter } from '@apollo/utils.keyvadapter';
import KeyvGzip from '@keyv/compress-gzip';

@Injectable()
export class RedisClient {
  private keyvAdapter: KeyvAdapter;
  private readonly logger = new Logger(RedisClient.name);
  constructor(private readonly envConfig: EnvConfigService) {}

  get adapter() {
    return this.keyvAdapter;
  }

  public init() {
    try {
      const { url } = this.envConfig.redis;
      const keyv = new Keyv(url, {
        compresion: KeyvGzip,
      });
      this.keyvAdapter = new KeyvAdapter(keyv);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
