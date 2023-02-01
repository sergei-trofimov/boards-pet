import axios, { AxiosError } from 'axios';
import { AuthResponse } from '@Types/api/auth-reponses.model';
import { ENDPOINTS } from '@Constants/endpoinst';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { ErrorResponse } from '@Types/api/error-response.model';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { User } from '@Types/entities/user';
import { redirect } from 'react-router-dom';

export async function loader(): Promise<AuthResponse | Response | null> {
  const idToken = localStorage.getItem(LocalStorageKeys.ID_TOKEN);

  if (idToken) {
    try {
      const response = await axios.post<{ users: AuthResponse[] }>(
        `${process.env[ENVIRONMENT_CONFIG.FIREBASE_AUTH_BASE_URL]}:${ENDPOINTS.firebase.userInfo}?key=${
          process.env[ENVIRONMENT_CONFIG.FIREBASE_API_KEY]
        }`,
        JSON.stringify({
          idToken,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data.users[0];
      const user = await getUser();

      return { email: data.email, expiresIn: '3600', idToken, localId: data.localId, user };
    } catch (error) {
      if ((error as AxiosError<{ error: ErrorResponse<string> }>).response.data.error.message === 'INVALID_ID_TOKEN') {
        localStorage.removeItem(LocalStorageKeys.ID_TOKEN);
        localStorage.removeItem(LocalStorageKeys.LOCAL_ID);
        localStorage.removeItem(LocalStorageKeys.EXPIRATION_TIME);

        return redirect('/');
      }

      throw new Response('Something went wrong', { status: 400 });
    }
  }

  return null;
}

export async function getUser(): Promise<User> {
  const localId = localStorage.getItem(LocalStorageKeys.LOCAL_ID);

  if (localId) {
    try {
      const { data } = await axios.get<User>(`${process.env[ENVIRONMENT_CONFIG.BASE_DB_URL]}/users/${localId}.json`);

      return { ...data, boards: [] };
    } catch (error) {
      throw new Response('Something went wrong', { status: 400 });
    }
  }

  return null;
}
