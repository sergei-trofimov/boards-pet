import { createAction } from '@Types/store/create-action.model';

export enum CardActionTypes {
  ADD_CARD = '[Card action] Add card',
}

export const cardsActions = {
  createCard: createAction<string, { id: string, title: string }>(CardActionTypes.ADD_CARD),
};
