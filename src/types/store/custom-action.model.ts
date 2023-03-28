import { Action } from '@reduxjs/toolkit';

export interface CustomAction<P = unknown> extends Action {
  payload?: P;
}
