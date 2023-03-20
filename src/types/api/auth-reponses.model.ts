import { User } from '@Types/entities/user';

export interface AuthResponse {
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  user: User;
}

export type AuthMode = 'login' | 'signup';
export type LogoutMode = 'delete';

export interface Logout {
  mode: LogoutMode;
}

export function isAuthResponseGuard(data: AuthResponse | Response): data is AuthResponse {
  return (data as AuthResponse)?.idToken !== undefined;
}
