import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { AccountResolver } from './resolvers/account.resolver';
import { AutomatchHttpModule } from '../common/http/automatch-http.module';

@Module({
  imports: [AutomatchHttpModule],
  providers: [AccountService, AccountResolver],
  exports: [AccountService],
})
export class AccountModule {}
