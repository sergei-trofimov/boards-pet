import { Card } from '@Types/entities/card.model';

export type RemoveFieldsPayload = {
  boardId: string;
  removeFieldsId: string[];
  updatedCard: Card;
};
