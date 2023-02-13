import { BoardsActionTypes } from './../boards/actions';
import { BoardsActions } from '@App-store/boards/actions';
import { RootState } from '@App-store/store';
import { BoardsApi } from '@Helpers/api/boards-api';
import { FieldsApi } from '@Helpers/api/fields-api';
import { Action, ThunkAction } from '@reduxjs/toolkit';
import { Card } from '@Types/entities/card.model';
import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';
import { AxiosError } from 'axios';

export enum FieldsActionTypes {
  // CREATE FIELD
  ADD_FIELD = '[Fields] Add field',
  ADD_FIELD_SUCCESS = '[Fields] Add field success',
  ADD_FIELD_FAILURE = '[Fields] Add field failure',
}

export const FieldsActions = {
  // CREATE FIELD
  createField: () => ({ type: FieldsActionTypes.ADD_FIELD }),
  createFieldSuccess: (cards: Card[]) => ({ type: FieldsActionTypes.ADD_FIELD_SUCCESS, payload: cards }),
  createFieldFailure: (error: string) => ({ type: FieldsActionTypes.ADD_FIELD_FAILURE, payload: error }),
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

      await fieldsApi.addFieldsAsync(boardId, updatedCards);
      await boardsApi.editRelatedFieldsAsync({ relatedFields, id: boardId });

      dispatch(FieldsActions.createFieldSuccess(updatedCards));
      dispatch(BoardsActions.updateFields({ fields: relatedFields, boardId }));
    } catch (error) {
      dispatch(FieldsActions.createFieldFailure((error as AxiosError).message));
    }
  };
};

export const feidlsThunks = {
  addField: addFieldAsync,
};
