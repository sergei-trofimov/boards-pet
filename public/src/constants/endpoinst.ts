import { Endpoints } from '@Types/api/endpoints.model';

export const ENDPOINTS: Endpoints = {
  firebase: {
    login: 'signInWithPassword',
    signup: 'signUp',
    userInfo: 'lookup',
  },
  db: {
    users: 'users',
    boards: 'boards',
    cards: 'cards',
    accounts: 'accounts'
  },
};
