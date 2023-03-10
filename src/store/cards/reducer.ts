import { Card } from '@Types/entities/card.model';
import { CardActionTypes } from './actions';
import CardsState from '@Types/store/cards-state.interface';
import { CustomAction } from '@Types/store/custom-action.model';
import { Reducer } from '@reduxjs/toolkit';
import { FieldsActionTypes } from '@App-store/fields/actions';

export const initialState: CardsState = {
  cards: [],
  isLoading: false,
  error: null,
};

const {
  ADD_CARD,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAILURE,
  FETCH_CARDS,
  FETCH_CARDS_SUCCESS,
  FETCH_CARDS_FAILURE,
  EDIT_CARD,
  EDIT_CARD_SUCCESS,
  EDIT_CARD_FAILURE,
  DELETE_CARD,
  DELETE_CARD_SUCCESS,
  DELETE_CARD_FAILURE,
} = CardActionTypes;

const { ADD_FIELD, ADD_FIELD_SUCCESS, ADD_FIELD_FAILURE, REMOVE_FIELDS, REMOVE_FIELDS_FAILURE, REMOVE_FIELDS_SUCCESS } =
  FieldsActionTypes;

export const cardsReducer: Reducer<CardsState, CustomAction> = function reducer(
  state = initialState,
  { type, payload }: CustomAction
): CardsState {
  switch (type) {
    // CREATE CARD
    case ADD_CARD:
      return { ...state, isLoading: true, error: null };

    case ADD_CARD_SUCCESS: {
      const updatedCards: Card[] = state.cards.concat(payload as Card);
      return { ...state, isLoading: false, cards: updatedCards };
    }

    case ADD_CARD_FAILURE:
      return { ...state, isLoading: false, error: payload as string };

    // FETCH CARDS
    case FETCH_CARDS:
      return { ...state, isLoading: true, error: null };

    case FETCH_CARDS_SUCCESS: {
      return { ...state, isLoading: false, cards: payload as Card[] };
    }

    case FETCH_CARDS_FAILURE:
      return { ...state, isLoading: false, error: payload as string };

    // EDIT CARDS
    case EDIT_CARD:
      return { ...state, isLoading: true, error: null };

    case EDIT_CARD_SUCCESS: {
      const updatedCard = payload as Card;
      const updatedCards: Card[] = state.cards.updateItem(updatedCard);

      return { ...state, isLoading: false, cards: updatedCards };
    }

    case EDIT_CARD_FAILURE:
      return { ...state, isLoading: false, error: payload as string };

    // DELETE CARDS
    case DELETE_CARD:
      return { ...state, isLoading: true, error: null };

    case DELETE_CARD_SUCCESS: {
      const updatedCards: Card[] = state.cards.filter(({ id }) => id !== (payload as Card).id);

      return { ...state, isLoading: false, cards: updatedCards };
    }

    case DELETE_CARD_FAILURE:
      return { ...state, isLoading: false, error: payload as string };

    // ADD FIELD
    case ADD_FIELD:
      return { ...state, isLoading: true, error: null };

    case ADD_FIELD_SUCCESS: {
      return { ...state, isLoading: false, cards: payload as Card[] };
    }

    case ADD_FIELD_FAILURE:
      return { ...state, isLoading: false, error: payload as string };

    // REMOVE FIELD
    case REMOVE_FIELDS:
      return { ...state, isLoading: true, error: null };

    case REMOVE_FIELDS_SUCCESS:
      return { ...state, isLoading: false, cards: payload as Card[] };

    case REMOVE_FIELDS_FAILURE:
      return { ...state, isLoading: false, error: payload as string };

    default:
      return state;
  }
};
