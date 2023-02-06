import { Action } from '@reduxjs/toolkit';
import { Card } from '@Types/entities/card.model';
import { RootState } from '@App-store/store';
import { ThunkAction } from 'redux-thunk'
import { createAction } from '@Types/store/create-action.model';

export enum CardActionTypes {
  ADD_CARD = '[Card action] Add card',
}

export const CardsActions = {
  createCard: createAction<CardActionTypes, Card>(CardActionTypes.ADD_CARD),
};

type CardsActionTypes = Action<keyof typeof CardActionTypes>;

// Thunks
// export const createCard = (params: string): ThunkAction<void, RootState, void, CardsActionTypes> => {
//   return async (dispatch, getState): Promise<void> => {};
// };