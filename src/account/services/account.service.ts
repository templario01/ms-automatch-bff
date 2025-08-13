import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, map } from 'rxjs';
import { AccountEntity } from '../entities/account.entity';
import { AutomatchHttpService } from '../../common/http/automatch-http.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly httpService: AutomatchHttpService,
    private readonly configService: ConfigService,
  ) {}

  getAccount(token: string): Observable<AccountEntity> {
    const url = `${this.configService.get('ACCOUNT_SERVICE_URL')}/v1/account`;

    return this.httpService
      .get<AccountEntity>(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(map((response) => response.data));
  }
}
