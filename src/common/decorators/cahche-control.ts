export type CacheScope = 'PUBLIC' | 'PRIVATE';
export type MaxAgeInMinutes = '0m' | '1m' | '3m' | '5m' | '8m' | '10m' | '15m';

const returnResolveInfo = (args: Array<any>): any =>
  args.find(
    (value) =>
      value &&
      Object.hasOwnProperty.bind(value)('fieldName') &&
      Object.hasOwnProperty.bind(value)('cacheControl'),
  );

const convertStrMinToSec = (minutes: MaxAgeInMinutes): number => {
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
  maxAge: MaxAgeInMinutes = '0m',
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
