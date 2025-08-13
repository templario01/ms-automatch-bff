import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { EnvSettings, envSettings } from './settings/config/env.settings';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EnvConfigModule } from './settings/config/env-config.module';
import { GraphqlOptions } from './settings/graphql/graphql-options.factory';
import { RedisModule } from './settings/redis/redis.module';
import { EnvConfigService } from './settings/config/env-config.service';
import { RedisClient } from './settings/redis/redis.client';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object<EnvSettings>(envSettings),
      envFilePath: '.env',
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [EnvConfigModule, RedisModule],
      inject: [EnvConfigService, RedisClient],
      driver: ApolloDriver,
      useClass: GraphqlOptions,
    }),
    VehiclesModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
