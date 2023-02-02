import { AxiosError } from 'axios';
import { BoadrsThunkTypes } from '@Constants/thunks/boards.constant';
import { Board } from '@Types/entities/board.model';
import { BoardsApi } from '@Helpers/api/boards-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const boardsApi = BoardsApi.Instance;

export const fetchBoardsThunk = createAsyncThunk<Board[]>(
  BoadrsThunkTypes.BOARDS_FETCH,
  async (_, { rejectWithValue }) => {
    try {
      return await boardsApi.getAllBoardsAsync();
    } catch (error) {
      return rejectWithValue((error as AxiosError).message);
    }
  }
);

export const addBoardsThunk = createAsyncThunk<Board, Pick<Board, 'title'>>(
  BoadrsThunkTypes.BOARDS_ADD,
  async (arg, { rejectWithValue }) => {
    try {
      return await boardsApi.createBoardAsync(arg);
    } catch (error) {
      return rejectWithValue((error as AxiosError).message);
    }
  }
);
