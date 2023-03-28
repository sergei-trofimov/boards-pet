import { BaseApi } from './base-api';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { Endpoints } from '@Types/api/endpoints.model';
import { Account } from '@Types/entities/account.model';

export class AccountApi extends BaseApi {
  private static _instance: AccountApi;

  private constructor() {
    super();
  }

  static get Instance(): AccountApi {
    return this._instance || (this._instance = new this());
  }

  async createAccountAsync(name: string, password: string): Promise<Account> {
    const body = new Account(name, password, [this.localId]);
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.accounts);
    const { data } = await this.axiosInstance.post(url, JSON.stringify(body));

    return { ...body, id: data.name, boardsId: [] };
  }

  async getUserAccountsAsync(ids: string[]): Promise<Account[]> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.accounts);
    const { data } = await this.axiosInstance.get<{ [key: string]: Omit<Account, 'id'> }>(url);
    const accounts: Account[] = Object.keys(data)
      .map((id) => ({ id, ...data[id], boardsId: data[id]['boardsId'] ?? [] }))
      .filter(({ id }) => ids.includes(id));

    return accounts;
  }

  async getAccountById(id: string): Promise<Account> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.accounts, id);
    const { data } = await this.axiosInstance.get<Omit<Account, 'id'>>(url);

    return { id, ...data };
  }

  // async removeBoardAsync(id: string): Promise<AxiosResponse<null>> {
  //   const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, [
  //     this.accountId,
  //     id,
  //   ]);
  //   return await this.axiosInstance.delete<null>(url);
  // }

  async editAccountAsync(payload: Account): Promise<Account> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.accounts, payload.id);
    const { data } = await this.axiosInstance.patch<Account>(url, JSON.stringify(payload));

    return { ...payload, ...data };
  }
}
