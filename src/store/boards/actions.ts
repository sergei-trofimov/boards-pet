import { createAction } from '@reduxjs/toolkit';
import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';

export enum BoardsActionTypes {
  UPDATE_FIELDS = '[Boards] Update fields',
}

export const BoardsActions = {
  updateFields: ({ fields, boardId }: { fields: BaseFormFieldDisplayModel[]; boardId: string }) => ({
    type: BoardsActionTypes.UPDATE_FIELDS,
    payload: { fields, boardId },
  }),
};
