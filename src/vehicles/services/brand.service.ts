import { Injectable } from '@nestjs/common';
import { AutomatchHttpService } from '../../common/http/automatch-http.service';
import { Observable, map } from 'rxjs';
import { VehicleBrand } from '../graphql-types/entities/vehicle-brand.entity';
import { BrandDto } from '../dtos/brand.dto';

@Injectable()
export class VehicleBrandService {
  constructor(private readonly httpService: AutomatchHttpService) {}

  getBrands(): Observable<VehicleBrand[]> {
    const path = 'http://127.0.0.1:3030/v1/brands/search';
    return this.httpService
      .get<BrandDto[]>(path, { params: { word: 'to' } })
      .pipe(map((response) => VehicleBrand.mapToEntities(response.data)));
  }
}
