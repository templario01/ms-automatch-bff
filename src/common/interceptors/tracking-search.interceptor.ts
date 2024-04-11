import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisClient } from '../../settings/redis/redis.client';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SearchVehiclesInput } from '../../vehicles/graphql-types/inputs/search-vehicles.input';

@Injectable()
export class TrackingSearchInterceptor implements NestInterceptor {
  private readonly ONE_MONTH_TTL = 2592000;
  private readonly logger = new Logger(TrackingSearchInterceptor.name);
  constructor(private readonly redisClient: RedisClient) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    const search = request.body.variables.searchVehiclesInput;
    console.log(request.body.operationName);
    const key = Buffer.from(request.body.operationName).toString('base64');

    return next.handle().pipe(tap(from(this.saveInRedis(key, search))));
  }

  private async saveInRedis(
    key: string,
    newSearch: SearchVehiclesInput,
  ): Promise<void> {
    try {
      const result = await this.redisClient.adapter.get(key);
      let data = [];
      if (result) {
        const searches = JSON.parse(result);
        data = searches.data;
        if (data.length >= 100) {
          data = [];
        }
      }
      const newSearches = JSON.stringify({
        data: [...data, newSearch],
      });
      await this.redisClient.adapter.set(key, newSearches, {
        ttl: this.ONE_MONTH_TTL,
      });
      this.logger.debug('new search saved in Redis');
    } catch (error) {
      this.logger.error('fail to save search in Redis');
    }
  }
}
