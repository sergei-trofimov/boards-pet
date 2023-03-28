import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { AccountApi } from '@Helpers/api/account-api';
import { UsersApi } from '@Helpers/api/users-api';
import { Account } from '@Types/entities/account.model';
import { User } from '@Types/entities/user.model';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { RootStore } from '../store';

const accountApi = AccountApi.Instance;
const usersApi = UsersApi.Instance;

export class AccountStore {
  accounts: Account[] = [];
  currentAccount: Account = null;
  isLoading = false;
  error: string = null;
  foundAccount: Account = null;

  constructor(private root: RootStore) {
    makeAutoObservable(this);
  }

  set setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  createAccountAsync = async (name: string, password: string): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      const account: Account = await accountApi.createAccountAsync(name, password);
      const { id, email, accountsId = [] } = this.root.auth.user;
      const updatedUser = new User(email, id, [...accountsId, account.id]);
      const user = await usersApi.createUserAsync(updatedUser);

      runInAction(() => {
        this.accounts.push(account);
        this.root.auth.user = user;
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  addAccountToUser = async (): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      const { id, email, accountsId = [] } = this.root.auth.user;
      const updatedAccount: Account = { ...this.foundAccount, usersId: [...(this.foundAccount?.usersId ?? []), id] };
      const account: Account = await accountApi.editAccountAsync(updatedAccount);
      const updatedUser = new User(email, id, [...accountsId, account.id]);
      const user = await usersApi.createUserAsync(updatedUser);

      runInAction(() => {
        this.accounts.push(account);
        this.foundAccount = null;
        this.root.auth.user = user;
        this.setAccount(account);
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  getUserAccountsAsync = async (): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      const { accountsId = [] } = this.root.auth.user;
      const accounts: Account[] = await accountApi.getUserAccountsAsync(accountsId);

      runInAction(() => {
        this.accounts.push(...accounts);
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  editAccountAsync = async (payload: Account): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      const updatedAccount: Account = await accountApi.editAccountAsync(payload);

      runInAction(() => {
        const index = this.accounts.findIndex(({ id }) => id === updatedAccount.id);

        this.accounts.splice(index, 1, updatedAccount);
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  setAccount = (account: Account): void => {
    this.currentAccount = account;
    localStorage.setItem(LocalStorageKeys.ACCOUNT_ID, account.id);
  };

  getAccountByIdAsync = async (id: string): Promise<void> => {
    this.setLoading = true;
    this.error = null;

    try {
      const account: Account = await accountApi.getAccountById(id);

      runInAction(() => {
        this.foundAccount = this.accounts.some(({ id }) => id === account.id) ? null : account;
      });
    } catch (error) {
      runInAction(() => {
        this.handleResponseError(<AxiosError>error);
      });
    } finally {
      runInAction(() => {
        this.setLoading = false;
      });
    }
  };

  private handleResponseError(error: AxiosError): void {
    this.error = error.message;
  }
}
