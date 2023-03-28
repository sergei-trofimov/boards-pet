import { AuthResponse } from '@Types/api/auth-reponses.model';
import { BaseApi } from './base-api';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { Endpoints } from '@Types/api/endpoints.model';

export class AuthApi extends BaseApi {
  private static _instance: AuthApi;

  private constructor() {
    super();
  }

  static get Instance(): AuthApi {
    return this._instance || (this._instance = new this());
  }

  async signUpWithEmailAndPasswordAsync(email: string, password: string): Promise<AuthResponse> {
    const url = this.buildUrl(
      ENVIRONMENT_CONFIG.FIREBASE_AUTH_BASE_URL,
      false,
      ':',
      (e: Endpoints) => e.firebase.signup,
      null,
      { key: this.API_KEY }
    );

    const { data } = await this.axiosInstance.post<AuthResponse>(
      url,
      JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      })
    );

    return data;
  }

  async loginWithEmailAndPasswordAsync(email: string, password: string): Promise<AuthResponse> {
    const url = this.buildUrl(
      ENVIRONMENT_CONFIG.FIREBASE_AUTH_BASE_URL,
      false,
      ':',
      (e: Endpoints) => e.firebase.login,
      null,
      { key: this.API_KEY }
    );

    const { data } = await this.axiosInstance.post<AuthResponse>(
      url,
      JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      })
    );

    return data;
  }

  async getAuthenticatedUserData(idToken: string): Promise<AuthResponse> {
    const url = this.buildUrl(
      ENVIRONMENT_CONFIG.FIREBASE_AUTH_BASE_URL,
      false,
      ':',
      (e: Endpoints) => e.firebase.userInfo,
      null,
      { key: this.API_KEY }
    );

    const { data } = await this.axiosInstance.post<{ users: AuthResponse[] }>(url, JSON.stringify({ idToken }));

    return data.users[0];
  }
}
