import { Module } from '@nestjs/common';
import { VehicleBrandService } from './services/brand.service';
import { VehicleBrandResolver } from './resolvers/brand.resolver';
import { AutomatchHttpModule } from '../common/http/automatch-http.module';
import { EnvConfigModule } from '../settings/config/env-config.module';
import { VehicleService } from './services/vehicle.service';
import { VehicleResolver } from './resolvers/vehicle.resolver';
import { RedisModule } from '../settings/redis/redis.module';

@Module({
  imports: [AutomatchHttpModule, EnvConfigModule, RedisModule],
  providers: [
    VehicleBrandService,
    VehicleBrandResolver,
    VehicleService,
    VehicleResolver,
  ],
})
export class VehiclesModule {}
