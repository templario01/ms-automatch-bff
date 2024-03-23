import { Injectable } from '@nestjs/common';
import { AutomatchHttpService } from '../../common/http/automatch-http.service';
import { Observable, map } from 'rxjs';
import { VehicleBrandEntity } from '../graphql-types/entities/vehicle-brand.entity';
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

  public getBrands(word: string): Observable<VehicleBrandEntity[]> {
    const url = `${this.apiUrl}/brands/search`;
    const params: Record<string, string> = {
      word,
    };
    return this.httpService
      .get<BrandDto[]>(url, { params })
      .pipe(map(({ data }) => VehicleBrandEntity.mapToEntities(data)));
  }
}
