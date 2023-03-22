import { AuthApi } from '@Helpers/api/auth-api';
import { AuthResponse } from '@Types/api/auth-reponses.model';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@Types/api/error-response.model';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { UsersApi } from '@Helpers/api/users-api';
import { redirect } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';

export async function loader(): Promise<AuthResponse | Response | null> {
  const idToken = localStorage.getItem(LocalStorageKeys.ID_TOKEN);

  if (idToken) {
    try {
      const authApi = AuthApi.Instance;
      const usersApi = UsersApi.Instance;
      const data = await authApi.getAuthenticatedUserData(idToken);
      const user = await usersApi.getUserAsync();

      return { email: data.email, expiresIn: '3600', idToken, localId: data.localId, user };
    } catch (error) {
      switch ((error as AxiosError<{ error: ErrorResponse<string> }>).response.data.error.message) {
        case 'USER_NOT_FOUND':
          return redirect(AppRoutes.signup);

        case 'INVALID_ID_TOKEN':
          return redirect('/');

        default:
          throw new Response('Something went wrong', { status: 400 });
      }
    }
  }

  return null;
}
