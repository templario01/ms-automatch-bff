import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import {
  HttpRequestConfig,
  HttpRequestConfigGet,
} from './types/automatch-http.types';
import { Observable, catchError, tap } from 'rxjs';
import { ApiErrorException } from '../exceptions/api-error.exception';

@Injectable()
export class AutomatchHttpService {
  private readonly logger = new Logger(AutomatchHttpService.name);
  constructor(private readonly httpService: HttpService) {}

  public get<T>(
    url: string,
    config?: HttpRequestConfigGet,
  ): Observable<AxiosResponse<T>> {
    const method: Method = 'GET';
    return this.request<T>({ ...config, method, url });
  }

  public post<T>(
    url: string,
    config: HttpRequestConfig,
  ): Observable<AxiosResponse<T>> {
    const method: Method = 'POST';
    return this.request<T>({ ...config, method, url });
  }

  public delete<T>(
    url: string,
    config: HttpRequestConfig,
  ): Observable<AxiosResponse<T>> {
    const method: Method = 'DELETE';
    return this.request<T>({ ...config, method, url });
  }

  public put<T>(
    url: string,
    config: HttpRequestConfig,
  ): Observable<AxiosResponse<T>> {
    const method: Method = 'PUT';
    return this.request<T>({ ...config, method, url });
  }

  private request<T>(
    requestConfig: AxiosRequestConfig,
  ): Observable<AxiosResponse<T>> {
    return this.httpService.request(requestConfig).pipe(
      tap((response) => {
        if (!response.data) {
          throw new ApiErrorException('data response empty');
        }
      }),
      catchError((error: AxiosError<any>) => {
        const response = error?.response?.data;
        this.logger.error('Request to external API failed', response);
        throw new ApiErrorException(response?.message);
      }),
    );
  }
}
