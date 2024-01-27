import { Module } from '@nestjs/common';
import { Brands } from './resolvers/brand.resolver';

@Module({
  imports: [],
  providers: [Brands],
})
export class VehiclesModule {}
