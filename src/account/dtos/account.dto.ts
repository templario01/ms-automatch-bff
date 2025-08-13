export enum DeletedNotificationStatus {
  WAITING = 'WAITING',
}

export type FavoriteVehicleDto = {
  readonly id: string;
  readonly vehicleId: string;
  readonly deletedNotificationStatus: DeletedNotificationStatus;
};

export type AccountDto = {
  readonly id: string;
  readonly hasActiveNotifications: boolean;
  readonly createdAt: string;
  readonly favoriteVehicles: FavoriteVehicleDto[];
};
