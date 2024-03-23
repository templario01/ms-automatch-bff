import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { CacheControl } from '../../common/decorators/cahche-control';
import { Observable } from 'rxjs';
import { PaginatedVehiclesEntity } from '../graphql-types/entities/paginated-vehicles.entity';
import { VehicleEntity } from '../graphql-types/entities/vehicle.entity';
import { SearchVehiclesInput } from '../graphql-types/inputs/search-vehicles.input';
import { VehicleService } from '../services/vehicle.service';

@Resolver(() => VehicleEntity)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Query(() => PaginatedVehiclesEntity)
  @CacheControl('PUBLIC', 300)
  getVehiclesByFilters(
    @Info() _info: ParameterDecorator,
    @Args('searchVehiclesInput') searchVehiclesInput: SearchVehiclesInput,
  ): Observable<any> {
    return this.vehicleService.findVehicles(searchVehiclesInput);
  }
}
