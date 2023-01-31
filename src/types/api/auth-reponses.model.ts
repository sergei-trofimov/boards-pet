export interface AuthReponse {
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
}

export type AuthMode = 'login' | 'signup';
export type LogoutMode = 'delete';

export interface Logout {
  mode: LogoutMode;
}

export function isAuthReponseGuard(data: AuthReponse | Response): data is AuthReponse {
  return (data as AuthReponse)?.idToken !== undefined;
}
