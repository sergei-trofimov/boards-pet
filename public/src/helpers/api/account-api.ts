import { AuthResponse } from '@Types/api/auth-reponses.model';
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

    return { ...body, id: data.name };
  }

  // async getAllBoardsAsync(): Promise<Board[]> {
  //   const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, this.localId);
  //   const { data } = await this.axiosInstance.get<BoardResponse>(url);
  //   const boards: Board[] = Object.keys(data).map((id) => ({ id, ...data[id] }));

  //   return boards;
  // }

  // async removeBoardAsync(id: string): Promise<AxiosResponse<null>> {
  //   const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, [
  //     this.localId,
  //     id,
  //   ]);
  //   return await this.axiosInstance.delete<null>(url);
  // }

  // async editBoardAsync<T extends Board>(payload: T): Promise<Board> {
  //   const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, [
  //     this.localId,
  //     payload.id,
  //   ]);
  //   const { data } = await this.axiosInstance.patch<T>(url, JSON.stringify({ title: payload.title } as T));

  //   return { ...payload, ...data };
  // }

  // async editRelatedCardsIdAsync(payload: { relatedCardsId: string[]; id: string }): Promise<AxiosResponse<null>> {
  //   const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, [
  //     this.localId,
  //     payload.id,
  //   ]);

  //   return await this.axiosInstance.patch<null>(url, JSON.stringify({ relatedCardsId: payload.relatedCardsId }));
  // }

  // async editRelatedFieldsAsync(payload: {
  //   relatedFields: BaseFormFieldDisplayModel[];
  //   id: string;
  // }): Promise<AxiosResponse<null>> {
  //   const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, [
  //     this.localId,
  //     payload.id,
  //   ]);

  //   return await this.axiosInstance.patch<null>(url, JSON.stringify({ relatedFields: payload.relatedFields }));
  // }
}
