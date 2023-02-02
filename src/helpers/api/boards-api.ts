import { Board, BoardRequestPayload, BoardResponse } from '@Types/entities/board.model';
import { BaseApi } from './base-api';
import { CreateEntityResponse } from '@Types/api/create-entity-response.model';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { Endpoints } from '@Types/api/endpoints.model';

export class BoardsApi extends BaseApi {
  private static _instance: BoardsApi;

  private constructor() {
    super();
  }

  static get Instance(): BoardsApi {
    return this._instance || (this._instance = new this());
  }

  async createBoardAsync(payload: Pick<Board, 'title'>): Promise<Board> {
    const body: BoardRequestPayload = { ...payload, userId: this.localId };
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, this.localId);
    const { data } = await this.axiosInstance.post<CreateEntityResponse>(url, JSON.stringify(body));

    return { ...body, id: data.name };
  }

  async getAllBoardsAsync(): Promise<Board[]> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.boards, this.localId);
    const { data } = await this.axiosInstance.get<BoardResponse>(url);
    const boards: Board[] = Object.keys(data).map((id) => ({ id, ...data[id] }));

    return boards;
  }
}
