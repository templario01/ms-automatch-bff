import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { CacheControl, MaxAge } from '../../common/decorators/cahche-control';
import { Observable } from 'rxjs';
import { PaginatedVehiclesEntity } from '../graphql-types/entities/paginated-vehicles.entity';
import { VehicleEntity } from '../graphql-types/entities/vehicle.entity';
import { SearchVehiclesInput } from '../graphql-types/inputs/search-vehicles.input';
import { VehicleService } from '../services/vehicle.service';
import { TrackingSearchInterceptor } from '../../common/interceptors/tracking-search.interceptor';
import { UseInterceptors } from '@nestjs/common';

@Resolver(() => VehicleEntity)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @UseInterceptors(TrackingSearchInterceptor)
  @Query(() => PaginatedVehiclesEntity)
  @CacheControl('PUBLIC', MaxAge.ONE_MINUTE)
  getVehiclesByFilters(
    @Info() _info: ParameterDecorator,
    @Args('searchVehiclesInput') searchVehiclesInput: SearchVehiclesInput,
  ): Observable<PaginatedVehiclesEntity> {
    return this.vehicleService.findVehicles(searchVehiclesInput);
  }

  @Query(() => [VehicleEntity])
  @CacheControl('PUBLIC', MaxAge.TEN_DAYS)
  getRecommendedVehicles(): Observable<VehicleEntity[]> {
    return this.vehicleService.findRecommendedVehicles();
  }
}
