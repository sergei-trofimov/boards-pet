import axios, { AxiosInstance } from 'axios';
import { ENDPOINTS } from '@Constants/endpoinst';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { Endpoints } from '@Types/api/endpoints.model';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { QueryParams } from '@Types/api/query-params.model';

export abstract class BaseApi {
  private _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });
  }

  protected get axiosInstance(): AxiosInstance {
    return this._axiosInstance;
  }

  protected get API_KEY(): string {
    return process.env[ENVIRONMENT_CONFIG.FIREBASE_API_KEY];
  }

  protected get localId(): string {
    return localStorage.getItem(LocalStorageKeys.LOCAL_ID);
  }

  protected get accountId(): string {
    return localStorage.getItem(LocalStorageKeys.ACCOUNT_ID);
  }

  protected buildUrl(
    basePath: ENVIRONMENT_CONFIG,
    withJSON: boolean,
    separator: string,
    endpointSelector?: (s: Endpoints) => string,
    dynamicParams?: string | string[],
    query?: QueryParams
  ): string {
    const baseUrl: string = process.env[basePath];
    const endpoint: string = endpointSelector ? endpointSelector(ENDPOINTS) : '';
    const params: string = this.buildDynamicParams(dynamicParams);
    const queries: string = query ? this.buildQueryParams(query) : '';

    return this.buildPath(baseUrl, withJSON, separator, endpoint, params, queries);
  }

  private buildDynamicParams(dynamicParams: string | string[] = ''): string {
    return Array.isArray(dynamicParams) ? dynamicParams.join('/') : dynamicParams;
  }

  private buildQueryParams(query: QueryParams): string {
    const params = new URLSearchParams(query).toString();

    return decodeURIComponent(params);
  }

  private buildPath(
    baseUrl: string,
    withJSON: boolean,
    separator: string,
    endpoint?: string,
    dynamicParams?: string,
    query?: string
  ): string {
    let path = baseUrl;

    if (endpoint) {
      path += `${separator || '/'}${endpoint}`;
    }

    if (dynamicParams) {
      path += `/${dynamicParams}`;
    }

    if (query) {
      path += `?${query}`;
    }

    return withJSON ? `${path}.json` : path;
  }
}
