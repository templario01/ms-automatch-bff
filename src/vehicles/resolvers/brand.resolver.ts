/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Args, Info, Query } from '@nestjs/graphql';
import { VehicleBrand } from '../graphql-types/entities/vehicle-brand.entity';
import { CacheControl } from '../../common/decorators/cahche-control';
import { Observable } from 'rxjs';
import { VehicleBrandService } from '../services/brand.service';

@Injectable()
export class VehicleBrandResolver {
  constructor(private readonly vehicleBrandService: VehicleBrandService) {}
  @Query(() => [VehicleBrand])
  @CacheControl('PUBLIC', 300)
  getBrands(
    @Info() _info: ParameterDecorator,
    @Args('word') word: string,
  ): Observable<VehicleBrand[]> {
    return this.vehicleBrandService.getBrands(word);
  }
}
