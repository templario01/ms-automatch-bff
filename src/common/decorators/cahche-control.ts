export type CacheScope = 'PUBLIC' | 'PRIVATE';

const returnResolveInfo = (args: Array<any>): any =>
  args.find(
    (value) =>
      value &&
      Object.hasOwnProperty.bind(value)('fieldName') &&
      Object.hasOwnProperty.bind(value)('cacheControl'),
  );

/**
 * CacheControl - Function to generate the Cache-Control response header.
 *
 * @param {string} scope - The scope of the cache. It can be 'PUBLIC' or 'PRIVATE'. Defaults to 'PRIVATE'.
 * @param {number} maxAge - The maximum time clients can cache the response, in seconds. Defaults to 0.
 * @returns {Function} - The same method with cacheControl
 */
export const CacheControl = (
  scope: CacheScope = 'PRIVATE',
  maxAge = 0,
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
        maxAge,
        scope,
      });

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
};
