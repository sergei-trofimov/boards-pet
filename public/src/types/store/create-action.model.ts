import { Action } from '@reduxjs/toolkit';
import { CustomAction } from '@Types/store/custom-action.model';

export function createAction<T extends string>(type: T): () => Action<T>;
export function createAction<T extends string, P>(type: T): (payload: P) => CustomAction<P>;
export function createAction<T, P>(type: T): unknown {
  return (payload?: P) => (payload ? { type, payload } : { type });
}
