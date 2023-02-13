import { BaseFormFieldDisplayModel } from '../form/form-data-to-display.models';

export class Card {
  public id: string;

  constructor(public title: string, public boardId: string, public fields: BaseFormFieldDisplayModel[]) {}
}

export type CardRequestPayload = Omit<Card, 'id'>;
