import { BoardsActionTypes } from './../boards/actions';
import { BoardsActions } from '@App-store/boards/actions';
import { RootState } from '@App-store/store';
import { BoardsApi } from '@Helpers/api/boards-api';
import { FieldsApi } from '@Helpers/api/fields-api';
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { Card } from '@Types/entities/card.model';
import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';
import { AxiosError } from 'axios';
import { removeEntitiesByIds } from '@Utils/remove-entities-by-ids.function';

export enum FieldsActionTypes {
  // CREATE FIELD
  ADD_FIELD = '[Fields] Add field',
  ADD_FIELD_SUCCESS = '[Fields] Add field success',
  ADD_FIELD_FAILURE = '[Fields] Add field failure',

  // REMOVE FIELDS
  REMOVE_FIELDS = '[Fields] Remove fields',
  REMOVE_FIELDS_SUCCESS = '[Fields] Remove fields success',
  REMOVE_FIELDS_FAILURE = '[Fields] Remove fields failure',
}

export const FieldsActions = {
  // CREATE FIELD
  createField: () => ({ type: FieldsActionTypes.ADD_FIELD }),
  createFieldSuccess: (cards: Card[]) => ({ type: FieldsActionTypes.ADD_FIELD_SUCCESS, payload: cards }),
  createFieldFailure: (error: string) => ({ type: FieldsActionTypes.ADD_FIELD_FAILURE, payload: error }),

  // REMOVE FIELDS
  removeFields: () => ({ type: FieldsActionTypes.REMOVE_FIELDS }),
  removeFieldsSuccess: (cards: Card[]) => ({ type: FieldsActionTypes.REMOVE_FIELDS_SUCCESS, payload: cards }),
  removeFieldsFailure: (error: string) => ({ type: FieldsActionTypes.REMOVE_FIELDS_FAILURE, payload: error }),
};

const fieldsApi = FieldsApi.Instance;
const boardsApi = BoardsApi.Instance;

// Thunks
const addFieldAsync = (payload: {
  boardId: string;
  fields: BaseFormFieldDisplayModel[];
}): ThunkAction<void, RootState, void, Action<FieldsActionTypes | BoardsActionTypes>> => {
  return async (dispatch, getState): Promise<void> => {
    dispatch(FieldsActions.createField());
    const { boardId, fields } = payload;

    try {
      const updatedCards: Card[] = getState().cards.cards.map((card: Card) => ({
        ...card,
        fields: [...(card?.fields || []), ...fields],
      }));
      const relatedFields: BaseFormFieldDisplayModel[] = [
        ...fields,
        ...(getState().boards.boards.find(({ id }) => boardId === id)?.relatedFields || []),
      ];

      await fieldsApi.editFieldsAsync(boardId, updatedCards);
      await boardsApi.editRelatedFieldsAsync({ relatedFields, id: boardId });

      dispatch(FieldsActions.createFieldSuccess(updatedCards));
      dispatch(BoardsActions.addFields({ fields: relatedFields, boardId }));
    } catch (error) {
      dispatch(FieldsActions.createFieldFailure((error as AxiosError).message));
    }
  };
};

const removeFieldsAsync = (payload: {
  boardId: string;
  removeFieldsId: string[];
  updatedCard: Card;
}): ThunkAction<void, RootState, void, Action<FieldsActionTypes | BoardsActionTypes>> => {
  return async (dispatch, getState): Promise<void> => {
    dispatch(FieldsActions.removeFields());
    const { boardId, removeFieldsId, updatedCard } = payload;

    try {
      const updatedCards: Card[] = getState().cards.cards.map((card: Card) => {
        return card.id === updatedCard.id
          ? updatedCard
          : {
              ...card,
              fields: removeEntitiesByIds(card.fields, removeFieldsId),
            };
      });

      const updatedBoardRelatedFields: BaseFormFieldDisplayModel[] = removeEntitiesByIds(
        getState().boards.boards.find(({ id }) => boardId === id).relatedFields,
        removeFieldsId
      );

      await fieldsApi.editFieldsAsync(boardId, updatedCards);
      await boardsApi.editRelatedFieldsAsync({ relatedFields: updatedBoardRelatedFields, id: boardId });
      dispatch(FieldsActions.removeFieldsSuccess(updatedCards));
    } catch (error) {
      dispatch(FieldsActions.removeFieldsFailure((error as AxiosError).message));
    }
  };
};

export const feidlsThunks = {
  addField: addFieldAsync,
  removeField: removeFieldsAsync,
};
