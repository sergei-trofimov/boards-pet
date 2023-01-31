import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { Logout } from '@Types/api/auth-reponses.model';

export function action(): Logout {
  localStorage.removeItem(LocalStorageKeys.ID_TOKEN);
  localStorage.removeItem(LocalStorageKeys.LOCAL_ID);
  localStorage.removeItem(LocalStorageKeys.EXPIRATION_TIME);

  return { mode: 'delete' };
}
