export class Card {
  public id: string;

  constructor(public title: string, public boardId: string) {}
}

export type CardRequestPayload = Omit<Card, 'id'>;
