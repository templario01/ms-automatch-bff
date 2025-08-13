import { Resolver, Context, Query } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { AccountEntity } from '../entities/account.entity';

@Resolver(() => AccountEntity)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(() => AccountEntity)
  account(@Context() context): Observable<AccountEntity> {
    const token = context.req.headers.authorization?.split(' ')[1];
    return this.accountService.getAccount(token);
  }
}
