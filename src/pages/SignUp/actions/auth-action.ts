import axios, { AxiosError } from 'axios';
import { AppRoutes } from '@Constants/app-routes';
import { AuthErrorKeys } from '@Constants/auth-error-mapper.constant';
import { AuthResponse } from '@Types/api/auth-reponses.model';
import { ENDPOINTS } from '@Constants/endpoinst';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { User } from '@Types/entities/user';
import { getUser } from '../loaders/force-auth-loader';
import { json } from 'react-router-dom';

export async function action({ request }: { request: Request }): Promise<AuthResponse | Response> {
  const isLoginMode = new URL(request.url).pathname === `/${AppRoutes.login}`;

  const url = `${process.env[ENVIRONMENT_CONFIG.FIREBASE_AUTH_BASE_URL]}:${
    isLoginMode ? ENDPOINTS.firebase.login : ENDPOINTS.firebase.signup
  }?key=${process.env[ENVIRONMENT_CONFIG.FIREBASE_API_KEY]}`;

  const formData: FormData = await request.formData();
  const { email, password, repeatPassword } = Object.fromEntries(formData);

  if (!isLoginMode && password !== repeatPassword) {
    return json({ message: AuthErrorKeys.PASSWORDS_DO_NOT_MATCH, ok: false });
  }

  try {
    const { data } = await axios.post<AuthResponse>(
      url,
      JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { expiresIn, idToken, localId } = data;
    const experationTime = +expiresIn * 1000 + new Date().getTime();

    localStorage.setItem(LocalStorageKeys.ID_TOKEN, idToken);
    localStorage.setItem(LocalStorageKeys.EXPIRATION_TIME, experationTime.toString());
    localStorage.setItem(LocalStorageKeys.LOCAL_ID, localId);

    let user: User;

    if (isLoginMode) {
      user = await getUser();
    } else {
      user = await addUser(email as string);
    }

    user = { ...user, boards: [] };

    return { email: data.email, expiresIn, idToken, localId, user };
  } catch (error) {
    const { message } = (error as AxiosError<{ error: { code: number; message: string } }>).response.data.error;

    return json({ message, ok: false });
  }
}

async function addUser(email: string): Promise<User> {
  const localId = localStorage.getItem(LocalStorageKeys.LOCAL_ID);
  const user = new User(email, localId);
  const { data } = await axios.put<User>(
    `${process.env[ENVIRONMENT_CONFIG.BASE_DB_URL]}/users/${localId}.json`,
    JSON.stringify(user),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return data;
}
