import { AuthReponse } from '@Types/api/auth-reponses.model';

interface AuthState {
  isAuth: boolean;
  authData: AuthReponse;
}

export default AuthState;
