import { AccountApi } from '@Helpers/api/account-api';
import { UsersApi } from '@Helpers/api/users-api';
import { Account } from '@Types/entities/account.model';
import { User } from '@Types/entities/user.model';
import { AxiosError } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '../store';

const accountApi = AccountApi.Instance;
const usersApi = UsersApi.Instance;

export class AcountStore {
  accounts: Account[] = [];
  currentAccount: Account = null;
  isLoading = false;
  error: string = null;

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
        this.currentAccount = account;
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

  private handleResponseError(error: AxiosError): void {
    this.error = error.message;
  }
}
