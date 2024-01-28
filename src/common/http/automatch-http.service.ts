import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import {
  HttpRequestConfig,
  HttpRequestConfigGet,
} from './types/automatch-http.types';
import { Observable } from 'rxjs';

@Injectable()
export class AutomatchHttpService {
  constructor(private readonly httpService: HttpService) {}

  public get<T>(
    url: string,
    config: HttpRequestConfigGet,
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
    return this.httpService.request(requestConfig);
  }
}
