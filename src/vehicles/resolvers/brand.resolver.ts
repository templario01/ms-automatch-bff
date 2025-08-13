import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { VehicleBrandEntity } from '../graphql-types/entities/vehicle-brand.entity';
import { CacheControl, MaxAge } from '../../common/decorators/cache-control';
import { Observable } from 'rxjs';
import { VehicleBrandService } from '../services/brand.service';

@Resolver(() => VehicleBrandEntity)
export class VehicleBrandResolver {
  constructor(private readonly vehicleBrandService: VehicleBrandService) {}
  @Query(() => [VehicleBrandEntity])
  @CacheControl('PUBLIC', MaxAge.TEN_MINUTES)
  getBrands(
    @Info() _info: ParameterDecorator,
    @Args('word') word: string,
  ): Observable<VehicleBrandEntity[]> {
    return this.vehicleBrandService.getBrands(word);
  }
}
