import { Card, CardRequestPayload } from '@Types/entities/card.model';
import { AxiosResponse } from 'axios';
import { BaseApi } from './base-api';
import { CreateEntityResponse } from '@Types/api/create-entity-response.model';
import { Dictionary } from '@reduxjs/toolkit';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { Endpoints } from '@Types/api/endpoints.model';

export class CardsApi extends BaseApi {
  private static _instance: CardsApi;

  private constructor() {
    super();
  }

  static get Instance(): CardsApi {
    return this._instance || (this._instance = new this());
  }

  async createCardAsync(body: CardRequestPayload, boardId: string): Promise<Card> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.cards, [
      this.localId,
      boardId,
    ]);
    const { data } = await this.axiosInstance.post<CreateEntityResponse>(url, JSON.stringify(body));

    return { ...body, id: data.name };
  }

  async getCardsByBoardIdAsync(boardId: string): Promise<Card[]> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.cards, [
      this.localId,
      boardId,
    ]);
    const { data } = await this.axiosInstance.get<Dictionary<Card>>(url);

    return data ? Object.keys(data).map((id) => ({ id, ...data[id] })) : [];
  }

  async editCardAsync(payload: Card): Promise<Card> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.cards, [
      this.localId,
      payload.boardId,
      payload.id,
    ]);
    const { data } = await this.axiosInstance.patch<Card>(url, JSON.stringify({ title: payload.title }));

    return { ...payload, ...data };
  }

  async deleteCardAsync(card: Card): Promise<AxiosResponse<null>> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.cards, [
      this.localId,
      card.boardId,
      card.id,
    ]);

    return await this.axiosInstance.delete<null>(url);
  }
}
