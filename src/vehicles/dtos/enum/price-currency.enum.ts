import { registerEnumType } from '@nestjs/graphql';

export enum PriceCurrency {
  USD = 'USD',
  PEN = 'PEN',
  USDPEN = 'USDPEN',
}

registerEnumType(PriceCurrency, {
  name: 'PriceCurrency',
  description: 'Original price(s) of vehicle publication',
});
