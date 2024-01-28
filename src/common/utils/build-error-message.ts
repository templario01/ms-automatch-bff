import { HttpStatus } from '@nestjs/common';

export const buildErrorMessage = (value: HttpStatus): string => {
  const errorKey = Object.keys(HttpStatus).find(
    (key) => HttpStatus[key] === value,
  );

  return errorKey
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (match) => match.toUpperCase());
};
