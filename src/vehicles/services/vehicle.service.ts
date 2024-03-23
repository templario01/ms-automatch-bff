import { Injectable } from '@nestjs/common';
import { AutomatchHttpService } from '../../common/http/automatch-http.service';
import { Observable, map } from 'rxjs';
import { EnvConfigService } from '../../settings/config/env-config.service';
import { PaginatedVehiclesEntity } from '../graphql-types/entities/paginated-vehicles.entity';
import { SearchVehiclesInput } from '../graphql-types/inputs/search-vehicles.input';
import { Paginated, VehicleDto } from '../dtos/vehicle.dto';

@Injectable()
export class VehicleService {
  private apiUrl: string;
  constructor(
    private readonly httpService: AutomatchHttpService,
    private readonly envConfigService: EnvConfigService,
  ) {
    this.apiUrl = this.envConfigService.inventory.url;
  }

  public findVehicles(
    input: SearchVehiclesInput,
  ): Observable<PaginatedVehiclesEntity> {
    const url = `${this.apiUrl}/inventory/search`;
    const params: Record<string, string | number> = {
      ...input,
    };

    return this.httpService.get<Paginated<VehicleDto>>(url, { params }).pipe(
      map(({ data }) => {
        return PaginatedVehiclesEntity.mapToEntity(data);
      }),
    );
  }
}
