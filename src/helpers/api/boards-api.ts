import { Board, BoardRequestPayload, BoardResponse } from '@Types/entities/board.model';
import { AxiosResponse } from 'axios';
import { BaseApi } from './base-api';
import { CreateEntityResponse } from '@Types/api/create-entity-response.model';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { Endpoints } from '@Types/api/endpoints.model';
import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';

export class BoardsApi extends BaseApi {
  private static _instance: BoardsApi;

  private constructor() {
    super();
  }

  static get Instance(): BoardsApi {
    return this._instance || (this._instance = new this());
  }

  async createBoardAsync(title: string): Promise<Board> {
    const body: BoardRequestPayload = new Board(this.accountId, title);
    const url = this.buildUrl(
      ENVIRONMENT_CONFIG.BASE_DB_URL,
      true,
      null,
      (e: Endpoints) => e.db.boards,
      this.accountId
    );
    const { data } = await this.axiosInstance.post<CreateEntityResponse>(url, JSON.stringify(body));

    return { ...body, id: data.name };
  }

  async getAllBoardsAsync(): Promise<Board[]> {
    const url = this.buildUrl(
      ENVIRONMENT_CONFIG.BASE_DB_URL,
      true,
      null,
      (e: Endpoints) => e.db.boards,
      this.accountId
    );
    const { data } = await this.axiosInstance.get<BoardResponse>(url);
    const boards: Board[] = Object.keys(data).map((id) => ({ id, ...data[id] }));

    return boards;
  }

  async removeBoardAsync(id: string): Promise<AxiosResponse<null>> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, [
      this.accountId,
      id,
    ]);
    return await this.axiosInstance.delete<null>(url);
  }

  async editBoardAsync<T extends Board>(payload: T): Promise<Board> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, [
      this.accountId,
      payload.id,
    ]);
    const { data } = await this.axiosInstance.patch<T>(url, JSON.stringify({ title: payload.title } as T));

    return { ...payload, ...data };
  }

  async editRelatedCardsIdAsync(payload: { relatedCardsId: string[]; id: string }): Promise<AxiosResponse<null>> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, [
      this.accountId,
      payload.id,
    ]);

    return await this.axiosInstance.patch<null>(url, JSON.stringify({ relatedCardsId: payload.relatedCardsId }));
  }

  async editRelatedFieldsAsync(payload: {
    relatedFields: BaseFormFieldDisplayModel[];
    id: string;
  }): Promise<AxiosResponse<null>> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, [
      this.accountId,
      payload.id,
    ]);

    return await this.axiosInstance.patch<null>(url, JSON.stringify({ relatedFields: payload.relatedFields }));
  }
}
