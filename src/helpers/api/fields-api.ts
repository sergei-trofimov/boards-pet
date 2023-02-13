import { Card, CardRequestPayload } from '@Types/entities/card.model';
import { AxiosResponse } from 'axios';
import { BaseApi } from './base-api';
import { CreateEntityResponse } from '@Types/api/create-entity-response.model';
import { Dictionary } from '@reduxjs/toolkit';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { Endpoints } from '@Types/api/endpoints.model';
import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';

export class FieldsApi extends BaseApi {
  private static _instance: FieldsApi;

  private constructor() {
    super();
  }

  static get Instance(): FieldsApi {
    return this._instance || (this._instance = new this());
  }

  async addFieldsAsync(boardId: string, cards: Card[]): Promise<BaseFormFieldDisplayModel[][]> {
    const requests: Promise<BaseFormFieldDisplayModel[]>[] = cards.map(async (card) => {
      const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.cards, [
        this.localId,
        boardId,
        card.id,
      ]);

      const { data } = await this.axiosInstance.patch<{ fields: BaseFormFieldDisplayModel[] }>(
        url,
        JSON.stringify(card)
      );
      return data.fields;
    });

    return await Promise.all(requests);
  }

  // async getCardsByBoardIdAsync(boardId: string): Promise<Card[]> {
  //   const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.cards, [
  //     this.localId,
  //     boardId,
  //   ]);
  //   const { data } = await this.axiosInstance.get<Dictionary<Card>>(url);

  //   return data ? Object.keys(data).map((id) => ({ id, ...data[id] })) : [];
  // }

  // async editCardAsync<T>(payload: Card): Promise<Card> {
  //   const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.cards, [
  //     this.localId,
  //     payload.boardId,
  //     payload.id,
  //   ]);
  //   const { data } = await this.axiosInstance.patch<T>(url, JSON.stringify({ title: payload.title } as T));

  //   return { ...payload, ...data };
  // }

  // async deleteCardAsync(card: Card): Promise<AxiosResponse<null>> {
  //   const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.cards, [
  //     this.localId,
  //     card.boardId,
  //     card.id,
  //   ]);

  //   return await this.axiosInstance.delete<null>(url);
  // }
}
