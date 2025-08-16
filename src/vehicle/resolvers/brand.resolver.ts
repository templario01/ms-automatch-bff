import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { VehicleBrandEntity } from '../graphql-types/entities/vehicle-brand.entity';
import { CacheControl, MaxAge } from '../../common/decorators/cache-control';
import { Observable } from 'rxjs';
import { VehicleBrandService } from '../services/brand.service';
import { GetBrandsArgs } from '../graphql-types/inputs/get-grands.args';

@Resolver(() => VehicleBrandEntity)
export class VehicleBrandResolver {
  constructor(private readonly vehicleBrandService: VehicleBrandService) {}
  @Query(() => [VehicleBrandEntity])
  @CacheControl('PUBLIC', MaxAge.TEN_MINUTES)
  brands(
    @Info() _info: ParameterDecorator,
    @Args() args: GetBrandsArgs,
  ): Observable<VehicleBrandEntity[]> {
    return this.vehicleBrandService.getBrands(args.word);
  }
}
