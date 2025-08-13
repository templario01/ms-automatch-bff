import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AutomatchHttpService } from '../../common/http/automatch-http.service';
import { AccountEntity } from '../graphql-types/entities/account.entity';
import { AccountDto } from '../dtos/account.dto';
import { EnvConfigService } from '../../settings/config/env-config.service';
import { AxiosResponse } from 'axios';

@Injectable()
export class AccountService {
  private apiUrl: string;
  constructor(
    private readonly httpService: AutomatchHttpService,
    private readonly envConfigService: EnvConfigService,
  ) {
    this.apiUrl = this.envConfigService.account.url;
  }

  getAccount(token: string): Observable<AccountEntity> {
    const url = `${this.apiUrl}/account`;
    return this.httpService
      .get<AccountDto>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(map(({ data }) => AccountEntity.mapToEntity(data)));
  }

  addFavoriteVehicle(
    token: string,
    vehicleId: string,
  ): Observable<AxiosResponse<unknown, any>> {
    const url = `${this.apiUrl}/account/favorite-vehicle`;
    return this.httpService.post(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        vehicleId,
      },
    });
  }

  removeFavoriteVehicle(
    token: string,
    vehicleId: string,
  ): Observable<AxiosResponse<unknown, any>> {
    const url = `${this.apiUrl}/account/favorite-vehicle/${vehicleId}`;
    return this.httpService.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
