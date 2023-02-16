import { Context, createContext, FC, MutableRefObject, PropsWithChildren, useContext, useRef } from 'react';
import { AuthStore } from './auth';

export class RootStore {
  constructor(public auth = new AuthStore()) {}
}

const RootStoreContext: Context<RootStore> = createContext<RootStore>(null);

export const useRootStoreContext = () => useContext(RootStoreContext);

export const RootStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const store: MutableRefObject<RootStore> = useRef(new RootStore());

  return <RootStoreContext.Provider value={store.current}>{children}</RootStoreContext.Provider>;
};
