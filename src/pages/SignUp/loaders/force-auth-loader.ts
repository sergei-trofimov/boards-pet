import { AuthReponse } from '@Types/api/auth-reponses.model';
import { ENDPOINTS } from '@Constants/endpoinst';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import axios from 'axios';

export async function loader(): Promise<AuthReponse | null> {
  const idToken = localStorage.getItem(LocalStorageKeys.ID_TOKEN);

  if (idToken) {
    try {
      const response = await axios.post<{ users: AuthReponse[] }>(
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

      return { email: data.email, expiresIn: '3600', idToken, localId: data.localId };
    } catch (error) {
      throw new Response('Something went wrong', { status: 400 });
    }
  }

  return null;
}
