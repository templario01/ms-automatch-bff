import { ServiceUnavailableException } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, catchError, map } from 'rxjs';

export function handleAxiosResponse() {
  return <T>(source: Observable<AxiosResponse<T>>) => {
    return source.pipe(
      map<AxiosResponse<T>, T>((response) => response.data),
      catchError((err) => {
        throw new ServiceUnavailableException(err.message);
      }),
    );
  };
}
