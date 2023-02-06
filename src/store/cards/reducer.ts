import { Card } from '@Types/entities/card.model';
import { CardActionTypes } from './actions';
import CardsState from '@Types/store/cards-state.interface';
import { CustomAction } from '@Types/store/custom-action.model';
import { Reducer } from '@reduxjs/toolkit';

const initialState: CardsState = {
  cards: [],
  isLoading: false,
  error: null,
};

const { ADD_CARD } = CardActionTypes;

export const cardsReducer: Reducer<CardsState, CustomAction> = function reducer(
  state = initialState,
  action: CustomAction
): CardsState {
  switch (action.type) {
    case ADD_CARD:
      return { ...state, cards: [...state.cards, action.payload as Card] };

    default:
      return state;
  }
};
