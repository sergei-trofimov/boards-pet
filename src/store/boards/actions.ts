import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';

export enum BoardsActionTypes {
  ADD_FIELDS = '[Boards] Add fields',
  REMOVE_FIELDS = '[Boards] Remove fields',
}

export const BoardsActions = {
  addFields: ({ fields, boardId }: { fields: BaseFormFieldDisplayModel[]; boardId: string }) => ({
    type: BoardsActionTypes.ADD_FIELDS,
    payload: { fields, boardId },
  }),
  removeFields: ({ fields, boardId }: { fields: BaseFormFieldDisplayModel[]; boardId: string }) => ({
    type: BoardsActionTypes.ADD_FIELDS,
    payload: { fields, boardId },
  }),
};
