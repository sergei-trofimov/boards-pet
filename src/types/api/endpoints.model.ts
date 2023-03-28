export interface Endpoints {
  firebase: {
    login: string;
    signup: string;
    userInfo: string;
  };
  db: {
    users: string;
    boards: string;
    cards: string;
    accounts: string;
    invitations: string;
  };
  server: {
    invite: string;
  };
}
