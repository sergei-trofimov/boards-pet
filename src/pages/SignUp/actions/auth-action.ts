import axios, { AxiosError } from 'axios';
import { AppRoutes } from '@Constants/app-routes';
import { AuthReponse } from '@Types/api/auth-reponses.model';
import { ENDPOINTS } from '@Constants/endpoinst';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { json } from 'react-router-dom';
import { AuthErrorKeys } from '@Constants/auth-error-mapper.constant';

export async function action({ request }: { request: Request }): Promise<AuthReponse | Response> {
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
    const { data } = await axios.post<AuthReponse>(
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

    return { email: data.email, expiresIn, idToken, localId };
  } catch (error) {
    const { message } = (error as AxiosError<{ error: { code: number; message: string } }>).response.data.error;

    return json({ message, ok: false });
  }
}
