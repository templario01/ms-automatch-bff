import { Module } from '@nestjs/common';
import { VehicleBrandService } from './services/brand.service';
import { VehicleBrandResolver } from './resolvers/brand.resolver';
import { AutomatchHttpModule } from '../common/http/automatch-http.module';

@Module({
  imports: [AutomatchHttpModule],
  providers: [VehicleBrandService, VehicleBrandResolver],
})
export class VehiclesModule {}
