import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthResponse } from '@Types/api/auth-reponses.model';
import AuthState from '@Types/store/auth-state.interface';

const initialState: AuthState = {
  isAuth: false,
  authData: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, { payload }: PayloadAction<AuthResponse>) {
      const { user, ...rest } = payload;

      state.isAuth = true;
      state.authData = rest;
      state.user = user;
    },
    logout(state) {
      state.isAuth = false;
      state.authData = null;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
