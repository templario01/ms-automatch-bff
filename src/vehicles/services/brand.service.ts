import { Injectable } from '@nestjs/common';
import { AutomatchHttpService } from '../../common/http/automatch-http.service';
import { Observable, map } from 'rxjs';
import { VehicleBrand } from '../graphql-types/entities/vehicle-brand.entity';
import { BrandDto } from '../dtos/brand.dto';
import { EnvConfigService } from '../../settings/config/env-config.service';

@Injectable()
export class VehicleBrandService {
  private apiUrl: string;
  constructor(
    private readonly httpService: AutomatchHttpService,
    private readonly envConfigService: EnvConfigService,
  ) {
    this.apiUrl = this.envConfigService.inventory.url;
  }

  getBrands(word: string): Observable<VehicleBrand[]> {
    const route = '/brands/search';
    const url = `${this.apiUrl}${route}`;
    const params: Record<string, string> = {
      word,
    };

    return this.httpService
      .get<BrandDto[]>(url, { params })
      .pipe(map((response) => VehicleBrand.mapToEntities(response.data)));
  }
}
