import { GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EnvConfigService } from '../config/env-config.service';
import { RedisClient } from '../redis/redis.client';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { createHash } from 'crypto';
import { ApolloServerPlugin, GraphQLRequestContext } from '@apollo/server';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import {} from '@apollo/server/plugin/cacheControl';
import responseCachePlugin from '@apollo/server-plugin-response-cache';

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
    return {
      driver: ApolloDriver,
      cache: this.redisClient.adapter,
      useGlobalPrefix: true,
      playground: false,
      introspection: this.envConfig.app.environment !== 'production',
      autoSchemaFile: 'tmp/schema.gql',
      persistedQueries: { cache: this.redisClient.adapter, ttl: 60 },
      context: (context) => context,
      plugins: [...this.apolloGqlPlugins],
    };
  }

  private get apolloGqlPlugins(): ApolloServerPlugin[] {
    return [
      this.apolloExplorerSandboxPlugin,
      this.apolloCacheControlMaxAgePlugin,
      this.apolloCacheControlPlugin,
      this.apolloResponseCachePlugin,
    ];
  }

  private get apolloExplorerSandboxPlugin(): ApolloServerPlugin {
    if (this.environment === 'production') {
      return ApolloServerPluginLandingPageProductionDefault({ footer: false });
    }
    return ApolloServerPluginLandingPageLocalDefault({ footer: false });
  }

  private get apolloCacheControlMaxAgePlugin(): ApolloServerPlugin {
    return ApolloServerPluginCacheControl({ defaultMaxAge: 0 });
  }

  private get apolloCacheControlPlugin(): ApolloServerPlugin {
    return {
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
  }

  private generateRedisCustomCacheKey(
    _requestContext: GraphQLRequestContext<Record<string, any>>,
    keyData: unknown,
  ) {
    const hash = createHash('sha256')
      .update(JSON.stringify(keyData))
      .digest('hex');
    return hash;
  }

  private get apolloResponseCachePlugin(): ApolloServerPlugin {
    return responseCachePlugin({
      sessionId: async ({ request }) => {
        return request.http.headers.get('authorization') || null;
      },
      generateCacheKey: this.generateRedisCustomCacheKey,
    });
  }
}
