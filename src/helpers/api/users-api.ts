import { BaseApi } from './base-api';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { Endpoints } from '@Types/api/endpoints.model';
import { User } from '@Types/entities/user.model';

export class UsersApi extends BaseApi {
  private static _instance: UsersApi;

  private constructor() {
    super();
  }

  static get Instance(): UsersApi {
    return this._instance || (this._instance = new this());
  }

  async createUserAsync(user: User): Promise<User> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.users, this.localId);
    return (await this.axiosInstance.put<User>(url, JSON.stringify(user))).data;
  }

  async getUserAsync(): Promise<User> {
    if (this.localId) {
      const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.users, this.localId);

      try {
        return (await this.axiosInstance.get<User>(url)).data;
      } catch (error) {
        throw new Response('Something went wrong', { status: 400 });
      }
    }

    return null;
  }
}
