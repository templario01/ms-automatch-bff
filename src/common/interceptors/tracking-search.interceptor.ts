import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { EMPTY, Observable, from } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
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
    const key = Buffer.from(request.body.operationName).toString('base64');

    return next.handle().pipe(
      tap(
        this.saveInRedis(key, search).pipe(
          tap(() => this.logger.debug('new search saved in Redis')),
          catchError((error) => {
            this.logger.error('Error in saveInRedis:', error);
            return EMPTY;
          }),
        ),
      ),
    );
  }

  private saveInRedis(
    key: string,
    newSearch: SearchVehiclesInput,
  ): Observable<void> {
    return from(this.redisClient.adapter.get(key)).pipe(
      switchMap((result) => {
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
        return from(
          this.redisClient.adapter.set(key, newSearches, {
            ttl: this.ONE_MONTH_TTL,
          }),
        );
      }),
    );
  }
}
