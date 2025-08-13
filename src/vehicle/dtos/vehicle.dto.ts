import { InventoryStatus } from './enum/inventory-status.enum';
import { PriceCurrency } from './enum/price-currency.enum';
import { VehicleCondition } from './enum/vehicle-condition.enum';

export type Edge<T> = {
  cursor: string;
  node: T;
};

export type Paginated<T = VehicleDto> = {
  edges: Edge<T>[];
  nodes: T[];
  totalCount: number;
  hasNextPage: boolean;
  endCursor?: string;
};

export type VehicleDto = {
  readonly id: string;
  readonly externalId: string;
  readonly url: string;
  readonly name: string;
  readonly description?: string;
  readonly year: number;
  readonly transmission?: string;
  readonly mileage: number;
  readonly frontImage?: string;
  readonly images?: string;
  readonly location: string;
  readonly condition: VehicleCondition;
  readonly originalPrice: number;
  readonly price: number;
  readonly currency: PriceCurrency;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly websiteId: string;
  readonly status: InventoryStatus;
};
