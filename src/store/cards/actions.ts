import { Action } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Board } from '@Types/entities/board.model';
import { BoardsApi } from '@Helpers/api/boards-api';
import { Card, CardRequestPayload } from '@Types/entities/card.model';
import { CardsApi } from '@Helpers/api/cards-api';
import { RootState } from '@App-store/store';
import { ThunkAction } from 'redux-thunk';
import { createAction } from '@Types/store/create-action.model';

export enum CardActionTypes {
  // CREATE CARD
  ADD_CARD = '[Card] Add card',
  ADD_CARD_SUCCESS = '[Card] Add card success',
  ADD_CARD_FAILURE = '[Card] Add card failure',

  // FETCH CARDS
  FETCH_CARDS = '[Card] Fetch cards',
  FETCH_CARDS_SUCCESS = '[Card] Fetch cards success',
  FETCH_CARDS_FAILURE = '[Card] Fetch cards failure',

  // EDIT CARDS
  EDIT_CARD = '[Card] Edit card',
  EDIT_CARD_SUCCESS = '[Card] Edit card success',
  EDIT_CARD_FAILURE = '[Card] Edit card failure',

  // DELETE CARDS
  DELETE_CARD = '[Card] Delete card',
  DELETE_CARD_SUCCESS = '[Card] Delete card success',
  DELETE_CARD_FAILURE = '[Card] Delete card failure',
}

export const CardsActions = {
  // CREATE CARD
  createCard: createAction<CardActionTypes>(CardActionTypes.ADD_CARD),
  createCardSuccess: createAction<CardActionTypes, Card>(CardActionTypes.ADD_CARD_SUCCESS),
  createCardFailure: createAction<CardActionTypes, string>(CardActionTypes.ADD_CARD_FAILURE),

  // FETCH CARDS
  fetchCard: createAction<CardActionTypes>(CardActionTypes.FETCH_CARDS),
  fetchCardSuccess: createAction<CardActionTypes, Card[]>(CardActionTypes.FETCH_CARDS_SUCCESS),
  fetchCardFailure: createAction<CardActionTypes, string>(CardActionTypes.FETCH_CARDS_FAILURE),

  // EDIT CARDS
  editCard: createAction<CardActionTypes>(CardActionTypes.EDIT_CARD),
  editCardSuccess: createAction<CardActionTypes, Card>(CardActionTypes.EDIT_CARD_SUCCESS),
  editCardFailure: createAction<CardActionTypes, string>(CardActionTypes.EDIT_CARD_FAILURE),

  // EDIT CARDS
  deleteCard: createAction<CardActionTypes>(CardActionTypes.DELETE_CARD),
  deleteCardSuccess: createAction<CardActionTypes, Card>(CardActionTypes.DELETE_CARD_SUCCESS),
  deleteCardFailure: createAction<CardActionTypes, string>(CardActionTypes.DELETE_CARD_FAILURE),
};

const cardsApi = CardsApi.Instance;
const boardsApi = BoardsApi.Instance;

// Thunks
const createCardAsync = (
  payload: Pick<Card, 'title' | 'boardId'>
): ThunkAction<void, RootState, void, Action<CardActionTypes>> => {
  return async (dispatch, getState): Promise<void> => {
    dispatch(CardsActions.createCard());

    try {
      const { id, relatedCardsId, relatedFields }: Board = getState().boards.boards.find(
        ({ id }) => id === payload.boardId
      );
      const body: CardRequestPayload = new Card(payload.title, payload.boardId, relatedFields);
      const data: Card = await cardsApi.createCardAsync(body, id);
      const relatedIds: string[] = (relatedCardsId ?? []).concat(data.id);
      await boardsApi.editRelatedCardsIdAsync({ id, relatedCardsId: relatedIds });

      dispatch(CardsActions.createCardSuccess(data));
    } catch (error) {
      dispatch(CardsActions.createCardFailure((error as AxiosError).message));
    }
  };
};

const fetchCardsAsync = (boardId: string): ThunkAction<void, RootState, void, Action<CardActionTypes>> => {
  return async (dispatch): Promise<void> => {
    dispatch(CardsActions.fetchCard());

    try {
      const data: Card[] = await cardsApi.getCardsByBoardIdAsync(boardId);

      dispatch(CardsActions.fetchCardSuccess(data));
    } catch (error) {
      dispatch(CardsActions.fetchCardFailure((error as AxiosError).message));
    }
  };
};

const editCardAsync = (card: Card): ThunkAction<void, RootState, void, Action<CardActionTypes>> => {
  return async (dispatch): Promise<void> => {
    dispatch(CardsActions.editCard());

    try {
      const data: Card = await cardsApi.editCardAsync(card);

      dispatch(CardsActions.editCardSuccess(data));
    } catch (error) {
      dispatch(CardsActions.editCardFailure((error as AxiosError).message));
    }
  };
};

const deleteCardAsync = (card: Card): ThunkAction<void, RootState, void, Action<CardActionTypes>> => {
  return async (dispatch, getState): Promise<void> => {
    dispatch(CardsActions.editCard());

    try {
      await cardsApi.deleteCardAsync(card);
      const { id, relatedCardsId }: Board = getState().boards.boards.find(({ id }) => id === card.boardId);
      const relatedIds: string[] = relatedCardsId.filter((cardId) => cardId !== card.id);
      await boardsApi.editRelatedCardsIdAsync({ id, relatedCardsId: relatedIds });

      dispatch(CardsActions.deleteCardSuccess(card));
    } catch (error) {
      dispatch(CardsActions.deleteCardFailure((error as AxiosError).message));
    }
  };
};

export const cardThunks = {
  createCard: createCardAsync,
  fetchsCard: fetchCardsAsync,
  editCard: editCardAsync,
  deleteCard: deleteCardAsync,
};
