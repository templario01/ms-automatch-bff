/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Info, Query } from '@nestjs/graphql';
import { VehicleBrand } from '../graphql-types/entities/vehicle-brand.entity';
import { CacheControl } from '../../common/decorators/cahche-control';
import { Observable } from 'rxjs';
import { VehicleBrandService } from '../services/brand.service';

@Injectable()
export class VehicleBrandResolver {
  constructor(private readonly vehicleBrandService: VehicleBrandService) {}
  @Query(() => [VehicleBrand])
  @CacheControl('PUBLIC', 300)
  getBrands(@Info() _info: ParameterDecorator): Observable<VehicleBrand[]> {
    return this.vehicleBrandService.getBrands();
  }
}
