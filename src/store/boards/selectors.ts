import { Board } from '@Types/entities/board.model';
import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';
import { createSelector } from 'reselect';
import { RootState } from './../store';

const boardsEntities: (state: RootState) => Board[] = (state: RootState) => state.boards.boards;
const getBoardId: (state: RootState, id: string) => string = (state: RootState, id: string) => id;

export const boardsSelectors = {
  getBoardById: createSelector(
    [boardsEntities, getBoardId],
    (boards: Board[], boardId: string): Board => boards.find((board) => board.id === boardId)
  ),
  getRelatedFields: createSelector(
    [boardsEntities, getBoardId],
    (boards: Board[], boardId: string): BaseFormFieldDisplayModel[] =>
      boards.find(({ id }) => id === boardId)?.relatedFields || []
  ),
};
