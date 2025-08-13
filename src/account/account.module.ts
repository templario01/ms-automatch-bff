import { Module } from '@nestjs/common';
import { AccountService } from './services/account.service';
import { AccountResolver } from './resolvers/account.resolver';
import { AutomatchHttpModule } from '../common/http/automatch-http.module';
import { EnvConfigModule } from '../settings/config/env-config.module';
import { VehicleService } from '../vehicles/services/vehicle.service';
import { RedisModule } from '../settings/redis/redis.module';

@Module({
  imports: [AutomatchHttpModule, EnvConfigModule, RedisModule],
  providers: [AccountService, VehicleService, AccountResolver],
  exports: [AccountService],
})
export class AccountModule {}
