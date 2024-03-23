import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { VehicleBrandEntity } from '../graphql-types/entities/vehicle-brand.entity';
import { CacheControl } from '../../common/decorators/cahche-control';
import { Observable } from 'rxjs';
import { VehicleBrandService } from '../services/brand.service';

@Resolver(() => VehicleBrandEntity)
export class VehicleBrandResolver {
  constructor(private readonly vehicleBrandService: VehicleBrandService) {}
  @Query(() => [VehicleBrandEntity])
  @CacheControl('PUBLIC', 300)
  getBrands(
    @Info() _info: ParameterDecorator,
    @Args('word') word: string,
  ): Observable<VehicleBrandEntity[]> {
    return this.vehicleBrandService.getBrands(word);
  }
}
