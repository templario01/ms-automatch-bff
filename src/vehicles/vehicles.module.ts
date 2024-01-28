import { Module } from '@nestjs/common';
import { VehicleBrandService } from './services/brand.service';
import { VehicleBrandResolver } from './resolvers/brand.resolver';
import { AutomatchHttpModule } from '../common/http/automatch-http.module';
import { EnvConfigModule } from '../settings/config/env-config.module';

@Module({
  imports: [AutomatchHttpModule, EnvConfigModule],
  providers: [VehicleBrandService, VehicleBrandResolver],
})
export class VehiclesModule {}
