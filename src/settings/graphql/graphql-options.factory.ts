import { GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EnvConfigService } from '../config/env-config.service';
import { RedisClient } from '../redis/redis.client';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { ApolloServerPlugin, type GraphQLRequestContext } from '@apollo/server';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { createHash } from 'crypto';

export function generateCustomCacheKey(
  requestContext: GraphQLRequestContext<Record<string, any>>,
  keyData: unknown,
): string {
  return `${sha256(JSON.stringify(keyData))}`;
}

function sha256(text: string) {
  return createHash('sha256').update(text).digest('hex');
}

export const cacheControlPlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }) {
        const controlHeader = response.http.headers.get('Cache-Control');
        if (!controlHeader) {
          response.http.headers.set('Cache-Control', 'max-age=0, private');
        }
      },
    };
  },
};

@Injectable()
export class GraphqlOptions implements GqlOptionsFactory {
  private readonly environment: string;
  constructor(
    private readonly envConfig: EnvConfigService,
    private readonly redisClient: RedisClient,
  ) {
    this.environment = envConfig.app.environment;
  }

  createGqlOptions(): Promise<ApolloDriverConfig> | ApolloDriverConfig {
    this.redisClient.init();
    return {
      driver: ApolloDriver,
      cache: this.redisClient.adapter,
      useGlobalPrefix: true,
      playground: false,
      introspection: this.envConfig.app.environment !== 'production',
      autoSchemaFile: 'tmp/schema.gql',
      persistedQueries: {
        cache: this.redisClient.adapter,
        ttl: 60,
      },
      context: (context) => context,
      plugins: [
        this.apolloExplorerSandboxPlugin,
        ApolloServerPluginCacheControl({
          defaultMaxAge: 0,
        }),
        cacheControlPlugin,
        responseCachePlugin({
          sessionId: (requestContext) => {
            return Promise.resolve(
              requestContext.request.http.headers.get('authorization') || null,
            );
          },
          generateCacheKey: generateCustomCacheKey,
        }),
      ],
    };
  }

  get apolloExplorerSandboxPlugin(): ApolloServerPlugin {
    if (this.environment === 'production') {
      return ApolloServerPluginLandingPageProductionDefault({
        footer: false,
      });
    }
    return ApolloServerPluginLandingPageLocalDefault({ footer: false });
  }
}
