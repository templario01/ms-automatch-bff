export type CacheScope = 'PUBLIC' | 'PRIVATE';

export enum MaxAge {
  NO_MAX_AGE = '0m',
  ONE_MINUTE = '1m',
  THREE_MINUTES = '3m',
  FIVE_MINUTES = '5m',
  EIGHT_MINUTES = '8m',
  TEN_MINUTES = '10m',
  FIFTEEN_MINUTES = '15m',
  ONE_DAY = '10080m',
  FIVE_DAYS = '7200m',
  TEN_DAYS = '14400m',
  FIFTEEN_DAYS = '21600m',
}

const returnResolveInfo = (args: Array<any>): any =>
  args.find(
    (value) =>
      value &&
      Object.hasOwnProperty.bind(value)('fieldName') &&
      Object.hasOwnProperty.bind(value)('cacheControl'),
  );

const convertStrMinToSec = (minutes: MaxAge): number => {
  const mins = parseInt(minutes.slice(0, -1));
  return mins * 60;
};

/**
 * CacheControl Decorator - Function to generate Cache-Control response header.
 *
 * @param {string} scope - The scope of the cache. It can be 'PUBLIC' or 'PRIVATE'. Defaults to 'PRIVATE'.
 * @param {string} maxAge - The maximum time clients can cache the response, in minutes. Defaults 0 minutes.
 */
export const CacheControl = (
  scope: CacheScope = 'PRIVATE',
  maxAge: MaxAge = MaxAge.NO_MAX_AGE,
): MethodDecorator => {
  return (
    _target: any,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: Array<any>) {
      const info = returnResolveInfo(args);
      if (info === undefined) {
        return originalMethod.apply(this, args);
      }
      info.cacheControl.setCacheHint({
        maxAge: convertStrMinToSec(maxAge),
        scope,
      });

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
};
