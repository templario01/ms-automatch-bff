import { Resolver, Context, Query, Mutation, Args } from '@nestjs/graphql';
import { catchError, concatMap, map, Observable, of } from 'rxjs';
import { AccountService } from '../services/account.service';
import { AccountEntity } from '../graphql-types/entities/account.entity';
import { VehicleEntity } from 'src/vehicle/graphql-types/entities/vehicle.entity';
import { Parent, ResolveField } from '@nestjs/graphql';
import { VehicleService } from 'src/vehicle/services/vehicle.service';

@Resolver(() => AccountEntity)
export class AccountResolver {
  constructor(
    private readonly accountService: AccountService,
    private readonly vehicleService: VehicleService,
  ) {}

  @Query(() => AccountEntity)
  account(@Context() context: any): Observable<AccountEntity> {
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

  @Mutation(() => VehicleEntity)
  addFavoriteVehicle(
    @Context() context: any,
    @Args('vehicleId') vehicleId: string,
  ): Observable<VehicleEntity> {
    const token = context.req.headers.authorization;
    return this.accountService
      .addFavoriteVehicle(token, vehicleId)
      .pipe(
        concatMap(() =>
          this.vehicleService
            .findVehiclesByIds([vehicleId])
            .pipe(map((vehicles) => vehicles.at(0))),
        ),
      );
  }

  @Mutation(() => VehicleEntity)
  removeFavoriteVehicle(
    @Context() context: any,
    @Args('vehicleId') vehicleId: string,
  ): Observable<VehicleEntity> {
    const token = context.req.headers.authorization;
    return this.accountService
      .removeFavoriteVehicle(token, vehicleId)
      .pipe(
        concatMap(() =>
          this.vehicleService
            .findVehiclesByIds([vehicleId])
            .pipe(map((vehicles) => vehicles.at(0))),
        ),
      );
  }
}
