/* eslint-disable no-console */
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
        this.socket = io('https://boards-server.onrender.com');
      });

      this.joinRoom(accountId);
      this.initListeners();
    }
  };

  boardsUpdate = (): void => {
    this.socket.emit('boards_update');
  };

  cardsUpdate = (): void => {
    this.socket.emit('cards_update');
  };

  fieldsUpdate = (): void => {
    this.socket.emit('fields_update');
  };

  private joinRoom = (accountId: string): void => {
    this.socket.on('joined_to_account_success', () => {
      console.log('joined success');
    });

    this.socket.emit('join_account', accountId);
  };

  private initListeners = (): void => {
    this.socket.on('connect', () => {
      console.log('connection run');
    });

    this.socket.on('boards_updated_trigger', () => {
      this.root.boards.getAllBoardsAsync(this.root.accounts.currentAccount.boardsId);
    });

    this.socket.on('cards_updated_trigger', () => {
      this.root.cards.fetchCardsByBoardIdAsync(this.root.cards.cards[0].boardId);
    });

    this.socket.on('fields_updated_trigger', () => {
      this.root.cards.fetchCardsByBoardIdAsync(this.root.cards.cards[0].boardId);
    });
  };
}
