import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthReponse } from '@Types/api/auth-reponses.model';
import AuthState from '@Types/store/auth-state.interface';

const initialState: AuthState = {
  isAuth: false,
  authData: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<AuthReponse>) {
      state.isAuth = true;
      state.authData = payload;
    },
    logout(state) {
      state.isAuth = false;
      state.authData = null;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
