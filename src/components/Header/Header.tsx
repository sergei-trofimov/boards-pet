import { FC, useCallback } from 'react';
import { cards, logo } from '@Icons';
import { Button } from '@Common/Button/Button';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
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
    <>
      <div className="flex justify-between items-center mx-auto container px-10 h-17">
        <div className="h-9 w-9 rounded-full overflow-hidden">
          <img src={process.env[ENVIRONMENT_CONFIG.RANDOM_AVATAR]} alt="avatar" />
        </div>
        <Button primary classNames="max-w-24" type="submit" onClickHandler={handleLogoutClick}>
          Log Out
        </Button>
      </div>
      <div className="h-10 bg-slate-100">
        <div className="flex h-full container mx-auto px-10">
          <div className="flex-grow flex justify-center items-center">
            <Button classNames="px-1">
              <img src={logo} alt="add" />
            </Button>
            <Button classNames="px-1">
              <img src={cards} alt="add" />
            </Button>
          </div>
          <Button primary classNames="max-w-24">
            Manage
          </Button>
        </div>
      </div>
    </>
  );
};
