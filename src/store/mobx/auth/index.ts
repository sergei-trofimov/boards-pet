import { AuthResponse } from '@Types/api/auth-reponses.model';
import { User } from '@Types/entities/user.model';
import { makeAutoObservable } from 'mobx';

export class AuthStore {
  isAuth = false;
  authData: Omit<AuthResponse, 'user'> = null;
  user: User = null;

  constructor() {
    makeAutoObservable(this);
  }

  login = (response: AuthResponse) => {
    const { user, ...rest } = response;

    this.isAuth = true;
    this.authData = rest;
    this.user = user;
  };

  logout = () => {
    this.isAuth = false;
    this.authData = null;
  };
}
