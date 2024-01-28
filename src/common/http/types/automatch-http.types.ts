import { AxiosRequestConfig } from 'axios';

export type HttpRequestConfig = Omit<AxiosRequestConfig, 'method'>;

export type HttpRequestConfigGet = Omit<AxiosRequestConfig, 'method' | 'data'>;
