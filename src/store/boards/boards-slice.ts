import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { addBoardsThunk, fetchBoardsThunk } from './thunks/boards';
import { Board } from '@Types/entities/board.model';
import BoardsState from '@Types/store/boards-state.interface';

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
    builder.addCase(fetchBoardsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBoardsThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });
    builder.addCase(fetchBoardsThunk.fulfilled, (state, { payload }: PayloadAction<Board[]>) => {
      state.isLoading = false;
      state.boards = payload;
    });

    builder.addCase(addBoardsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addBoardsThunk.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload as string;
    });
    builder.addCase(addBoardsThunk.fulfilled, (state, { payload }: PayloadAction<Board>) => {
      state.isLoading = false;
      state.boards.push(payload);
    });
  },
});

export const boardsActions = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
