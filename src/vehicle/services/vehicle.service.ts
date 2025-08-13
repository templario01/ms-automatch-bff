import { Injectable } from '@nestjs/common';
import { AutomatchHttpService } from '../../common/http/automatch-http.service';
import { Observable, from, map, switchMap } from 'rxjs';
import { EnvConfigService } from '../../settings/config/env-config.service';
import { PaginatedVehiclesEntity } from '../graphql-types/entities/paginated-vehicles.entity';
import { SearchVehiclesInput } from '../graphql-types/inputs/search-vehicles.input';
import { Paginated, VehicleDto } from '../dtos/vehicle.dto';
import { RedisClient } from '../../settings/redis/redis.client';
import { VehicleEntity } from '../graphql-types/entities/vehicle.entity';

export type UserSearch = {
  brand: string;
  model: string;
  maxYear?: number;
  minYear?: number;
};

@Injectable()
export class VehicleService {
  private apiUrl: string;
  constructor(
    private readonly httpService: AutomatchHttpService,
    private readonly envConfigService: EnvConfigService,
    private readonly redisClient: RedisClient,
  ) {
    this.apiUrl = this.envConfigService.inventory.url;
  }

  public findVehicles(
    input: SearchVehiclesInput,
  ): Observable<PaginatedVehiclesEntity> {
    const url = `${this.apiUrl}/inventory/search`;
    const params: Record<string, string | number> = {
      ...input,
    };

    return this.httpService.get<Paginated<VehicleDto>>(url, { params }).pipe(
      map(({ data }) => {
        return PaginatedVehiclesEntity.mapToEntity(data);
      }),
    );
  }

  public findRecommendedVehicles(): Observable<VehicleEntity[]> {
    return this.getAllSearches().pipe(
      switchMap((userSearches) => {
        const url = `${this.apiUrl}/inventory/recommended`;
        const searches = Buffer.from(
          JSON.stringify({ data: userSearches }),
        ).toString('base64');
        return this.httpService
          .get<VehicleDto[]>(url, { params: { searches } })
          .pipe(
            map(({ data }) => {
              console.log(data);
              return VehicleEntity.mapToEntities(data);
            }),
          );
      }),
    );
  }

  public findVehiclesByIds(ids: string[]): Observable<VehicleEntity[]> {
    return this.httpService
      .get<VehicleDto[]>(`${this.apiUrl}/inventory/group`, {
        params: {
          ids: ids.join(','),
        },
      })
      .pipe(
        map(({ data }) => {
          return VehicleEntity.mapToEntities(data);
        }),
      );
  }

  private getAllSearches(): Observable<UserSearch[]> {
    const key = Buffer.from('getVehiclesByFilters').toString('base64');
    return from(this.redisClient.adapter.get(key)).pipe(
      map((result: string): UserSearch[] => {
        const redisSearches: SearchVehiclesInput[] = JSON.parse(result).data;
        return this.getTrackedSearches(redisSearches);
      }),
    );
  }

  private getTrackedSearches(
    redisSearches: SearchVehiclesInput[],
  ): UserSearch[] {
    const searchesByKey: Record<string, UserSearch> = {};
    redisSearches.forEach((search) => {
      const key = `${search.brand}-${search.model}`;
      if (!searchesByKey[key]) {
        searchesByKey[key] = {
          brand: search.brand,
          model: search.model,
          minYear: search.year,
          maxYear: search.year,
        };
      } else {
        searchesByKey[key].minYear = Math.min(
          searchesByKey[key].minYear,
          search.year,
        );
        searchesByKey[key].maxYear = Math.max(
          searchesByKey[key].maxYear,
          search.year,
        );
      }
    });

    const searches = Object.values(searchesByKey);
    searches.forEach((item) => {
      if (item.minYear === item.maxYear) {
        item.minYear = item.maxYear;
      }
    });
    return searches;
  }
}
