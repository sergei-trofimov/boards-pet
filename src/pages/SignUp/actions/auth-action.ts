import { AppRoutes } from '@Constants/app-routes';
import { AuthApi } from '@Helpers/api/auth-api';
import { AuthErrorKeys } from '@Constants/auth-error-mapper.constant';
import { AuthResponse } from '@Types/api/auth-reponses.model';
import { AxiosError } from 'axios';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { User } from '@Types/entities/user';
import { UsersApi } from '@Helpers/api/users-api';
import { json } from 'react-router-dom';

export async function action({ request }: { request: Request }): Promise<AuthResponse | Response> {
  const isLoginMode = new URL(request.url).pathname === `/${AppRoutes.login}`;
  const formData: FormData = await request.formData();
  const { email, password, repeatPassword } = Object.fromEntries(formData);

  if (!isLoginMode && password !== repeatPassword) {
    return json({ message: AuthErrorKeys.PASSWORDS_DO_NOT_MATCH, ok: false });
  }

  const authApi = AuthApi.Instance;

  try {
    let result: AuthResponse;

    if (isLoginMode) {
      result = await authApi.loginWithEmailAndPasswordAsync(email as string, password as string);
    } else {
      result = await authApi.signUpWithEmailAndPasswordAsync(email as string, password as string);
    }

    const { expiresIn, idToken, localId } = result;
    const experationTime = +expiresIn * 1000 + new Date().getTime();

    localStorage.setItem(LocalStorageKeys.ID_TOKEN, idToken);
    localStorage.setItem(LocalStorageKeys.EXPIRATION_TIME, experationTime.toString());
    localStorage.setItem(LocalStorageKeys.LOCAL_ID, localId);

    const usersApi = UsersApi.Instance;
    let user: User;

    if (isLoginMode) {
      user = await usersApi.getUserAsync();
    } else {
      const userEntity = new User(email as string, localId);
      user = await usersApi.createUserAsync(userEntity);
    }

    return { email: email as string, expiresIn, idToken, localId, user };
  } catch (error) {
    const { message } = (error as AxiosError<{ error: { code: number; message: string } }>).response.data.error;

    return json({ message, ok: false });
  }
}
