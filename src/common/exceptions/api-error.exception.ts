import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { buildErrorMessage } from '../utils/build-error-message';

export class ApiErrorException extends InternalServerErrorException {
  constructor(message: string) {
    const error = buildErrorMessage(HttpStatus.INTERNAL_SERVER_ERROR);
    super(error, {
      description: message,
    });
  }
}
