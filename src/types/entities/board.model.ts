export class Board {
  public id: string;
  public cardsId: string[] = [];

  constructor(public userId: string, public title: string) {}
}

export type BoardRequestPayload = Omit<Board, 'id'>;
export interface BoardResponse {
  [key: string]: Omit<Board, 'id'>;
}
