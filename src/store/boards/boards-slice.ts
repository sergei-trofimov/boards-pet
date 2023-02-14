import { PayloadAction, createSlice, createAction } from '@reduxjs/toolkit';
import { addBoardsThunk, editBoardThunk, fetchBoardsThunk, removeBoardThunk } from './thunks/boards';
import { Board } from '@Types/entities/board.model';
import BoardsState from '@Types/store/boards-state.interface';
import { CardActionTypes } from '@App-store/cards/actions';
import { Card } from '@Types/entities/card.model';
import { BoardsActions, BoardsActionTypes } from './actions';
import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';

const initialState: BoardsState = {
  boards: [],
  isLoading: false,
  error: null,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBoardsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBoardsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(fetchBoardsThunk.fulfilled, (state, { payload }: PayloadAction<Board[]>) => {
        state.isLoading = false;
        state.boards = payload;
      });

    builder
      .addCase(addBoardsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBoardsThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(addBoardsThunk.fulfilled, (state, { payload }: PayloadAction<Board>) => {
        state.isLoading = false;
        state.boards.push(payload);
      });

    builder
      .addCase(removeBoardThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeBoardThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(removeBoardThunk.fulfilled, (state, { payload }: PayloadAction<string>) => {
        state.isLoading = false;
        state.boards = state.boards.filter(({ id }) => id !== payload);
      });

    builder
      .addCase(editBoardThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editBoardThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload as string;
      })
      .addCase(editBoardThunk.fulfilled, (state, { payload }: PayloadAction<Board>) => {
        state.isLoading = false;
        state.boards = [...state.boards.filter(({ id }) => id !== payload.id), payload];
      });

    builder.addCase(createAction<Card>(CardActionTypes.ADD_CARD_SUCCESS), (state, action) => {
      const card: Card = action.payload;
      const board: Board = state.boards.find(({ id }) => id === card.boardId);

      if (board.relatedCardsId) {
        state.boards.find(({ id }) => id === card.boardId).relatedCardsId.push(card.id);
      } else {
        board.relatedCardsId = [card.id];
      }
    });

    builder.addCase(createAction<Card>(CardActionTypes.DELETE_CARD_SUCCESS), (state, action) => {
      const card: Card = action.payload;
      const board = state.boards.find(({ id }) => id === card.boardId);
      board.relatedCardsId = board.relatedCardsId.filter((cardId) => cardId !== card.id);

      state.boards = state.boards.updateItem(board);
    });

    builder.addCase(
      createAction<{ fields: BaseFormFieldDisplayModel[]; boardId: string }>(BoardsActionTypes.ADD_FIELDS),
      (state, action) => {
        const board: Board = state.boards.find(({ id }) => id === action.payload.boardId);

        board.relatedFields = action.payload.fields;
      }
    );

    builder.addCase(
      createAction<{ fields: BaseFormFieldDisplayModel[]; boardId: string }>(BoardsActionTypes.REMOVE_FIELDS),
      (state, action) => {
        const board: Board = state.boards.find(({ id }) => id === action.payload.boardId);

        board.relatedFields = action.payload.fields;
      }
    );
  },
});

export const boardsActions = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
