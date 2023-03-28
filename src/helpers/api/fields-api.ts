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

  async editFieldsAsync(boardId: string, cards: Card[]): Promise<BaseFormFieldDisplayModel[][]> {
    const requests: Promise<BaseFormFieldDisplayModel[]>[] = cards.map(async (card) => {
      const url = this.buildUrl(ENVIRONMENT_CONFIG.BASE_DB_URL, true, null, (e: Endpoints) => e.db.cards, [
        this.accountId,
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
}
