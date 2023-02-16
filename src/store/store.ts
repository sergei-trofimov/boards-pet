import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { boardsReducer } from '@Boards-state/boards-slice';
import { cardsReducer } from './cards/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
