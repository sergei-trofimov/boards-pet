import { Context, createContext, FC, MutableRefObject, PropsWithChildren, useContext, useRef } from 'react';
import { AccountStore } from './accounts';
import { AuthStore } from './auth';
import { BoardsStore } from './boards';
import { CardsStore } from './cards';
import { SocketStore } from './socket';
import { UIStore } from './ui';

export class RootStore {
  public auth = new AuthStore();
  public boards = new BoardsStore(this);
  public cards = new CardsStore(this);
  public accounts = new AccountStore(this);
  public ui = new UIStore(this);
  public socket = new SocketStore(this);
}

const RootStoreContext: Context<RootStore> = createContext<RootStore>(null);

export const useRootStoreContext = () => useContext(RootStoreContext);

export const RootStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const store: MutableRefObject<RootStore> = useRef(new RootStore());

  return <RootStoreContext.Provider value={store.current}>{children}</RootStoreContext.Provider>;
};
