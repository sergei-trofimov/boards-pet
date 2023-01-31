import { FC, useCallback } from 'react';
import { Button } from '@Common/Button/Button';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { authActions } from '@Auth-state/auth-slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Header: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.ID_TOKEN);
    localStorage.removeItem(LocalStorageKeys.LOCAL_ID);
    localStorage.removeItem(LocalStorageKeys.EXPIRATION_TIME);

    dispatch(authActions.logout());
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <div>
      <p>Home Component</p>
      <Button primary classNames="max-w-23" type="submit" onClickHandler={handleLogoutClick}>
        Logout
      </Button>
    </div>
  );
};
