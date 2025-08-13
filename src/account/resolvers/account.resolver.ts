import { Resolver, Context, Query } from '@nestjs/graphql';
import { catchError, Observable, of } from 'rxjs';
import { AccountService } from '../services/account.service';
import { AccountEntity } from '../graphql-types/entities/account.entity';
import { VehicleEntity } from 'src/vehicles/graphql-types/entities/vehicle.entity';
import { Parent, ResolveField } from '@nestjs/graphql';
import { VehicleService } from 'src/vehicles/services/vehicle.service';

@Resolver(() => AccountEntity)
export class AccountResolver {
  constructor(
    private readonly accountService: AccountService,
    private readonly vehicleService: VehicleService,
  ) {}

  @Query(() => AccountEntity)
  account(@Context() context): Observable<AccountEntity> {
    const token = context.req.headers.authorization;
    return this.accountService.getAccount(token);
  }

  @ResolveField(() => [VehicleEntity], { name: 'favoriteVehicles' })
  favoriteVehicles(
    @Parent() account: AccountEntity,
  ): Observable<VehicleEntity[]> {
    return this.vehicleService
      .findVehiclesByIds(account.favoriteVehiclesIds)
      .pipe(catchError(() => of([])));
  }
}
