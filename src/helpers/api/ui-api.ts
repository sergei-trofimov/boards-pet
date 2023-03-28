import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { Endpoints } from '@Types/api/endpoints.model';
import { InviteUserPayload } from '@Types/api/invite-user-payload.model';
import { BaseApi } from './base-api';

export class UIApi extends BaseApi {
  private static _instance: UIApi;

  private constructor() {
    super();
  }

  static get Instance(): UIApi {
    return this._instance || (this._instance = new this());
  }

  async inviteUserAsync(payload: InviteUserPayload): Promise<{ status: string }> {
    const url = this.buildUrl(ENVIRONMENT_CONFIG.SERVER_URL, false, null, (e: Endpoints) => e.server.invite);
    const { data } = await this.axiosInstance.post<{ status: string }>(url, JSON.stringify(payload));

    return data;
  }
}
