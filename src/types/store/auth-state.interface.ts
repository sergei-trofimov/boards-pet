import { AuthResponse } from '@Types/api/auth-reponses.model';
import { User } from '@Types/entities/user';

interface AuthState {
  isAuth: boolean;
  authData: Omit<AuthResponse, 'user'>;
  user: User;
}

export default AuthState;
