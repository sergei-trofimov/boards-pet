import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { WSEvents } from '@Constants/ws-events.constant';
import { makeAutoObservable, runInAction } from 'mobx';
import { io, Socket } from 'socket.io-client';
import { RootStore } from '../store';

export class SocketStore {
  private socket: Socket;

  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  get socketInstance(): Socket {
    return this.socket;
  }

  initSocketConnection = (): void => {
    const accountId = this.root.accounts?.currentAccount?.id;

    if (accountId) {
      runInAction(() => {
        this.socket = io(ENVIRONMENT_CONFIG.SERVER_URL);
      });

      this.joinRoom(accountId);
      this.initListeners();
    }
  };

  boardsUpdate = (): void => {
    this.socket.emit(WSEvents.BOARDS_UPDATE);
  };

  cardsUpdate = (): void => {
    this.socket.emit(WSEvents.CARDS_UPDATE);
  };

  fieldsUpdate = (): void => {
    this.socket.emit(WSEvents.CARDS_UPDATE);
  };

  private joinRoom = (accountId: string): void => {
    this.socket.emit(WSEvents.JOIN_ACCOUNT, accountId);
  };

  private initListeners = (): void => {
    this.socket.on(WSEvents.BOARDS_UPDATED_TRIGGER, () => {
      this.root.boards.getAllBoardsAsync(this.root.accounts.currentAccount.boardsId);
    });

    this.socket.on(WSEvents.CARDS_UPDATED_TRIGGER, () => {
      this.root.cards.fetchCardsByBoardIdAsync(this.root.cards.cards[0].boardId);
    });

    this.socket.on(WSEvents.FIELDS_UPDATED_TRIGGER, () => {
      this.root.cards.fetchCardsByBoardIdAsync(this.root.cards.cards[0].boardId);
    });
  };
}
