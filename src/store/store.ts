import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { authReducer } from '@Auth-state/auth-slice';
import { boardsReducer } from '@Boards-state/boards-slice';
import { cardsReducer } from './cards/reducer';
import { configureStore} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    auth: authReducer,
    boards: boardsReducer,
    counter: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
