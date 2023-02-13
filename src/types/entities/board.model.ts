import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';

export class Board {
  public id: string;
  public relatedCardsId: string[] = [];
  public relatedFields: BaseFormFieldDisplayModel[] = [];

  constructor(public userId: string, public title: string) {}
}

export type BoardRequestPayload = Omit<Board, 'id'>;
export interface BoardResponse {
  [key: string]: Omit<Board, 'id'>;
}
