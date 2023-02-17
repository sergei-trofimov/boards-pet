import { FC, useCallback, useEffect } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { Button } from '@Common/Button/Button';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { add } from '@Icons';
import { authActions } from '@Auth-state/auth-slice';
import { fetchBoardsThunk } from '@App-store/boards/thunks/boards';
import { useAppDispatch } from '@App-store/store';

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pathMatch = useMatch(AppRoutes.cards);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  const handleLogoutClick = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.ID_TOKEN);
    localStorage.removeItem(LocalStorageKeys.LOCAL_ID);
    localStorage.removeItem(LocalStorageKeys.EXPIRATION_TIME);

    dispatch(authActions.logout());
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <>
      <div className="flex justify-between items-center mx-auto container px-10 my-3">
        <div className="h-9 w-9 rounded-full overflow-hidden">
          <img src={process.env[ENVIRONMENT_CONFIG.RANDOM_AVATAR]} alt="avatar" />
        </div>
        <Button primary classNames="max-w-24" type="submit" onClickHandler={handleLogoutClick}>
          Log Out
        </Button>
      </div>
      <div className="h-10 bg-slate-100 mb-6">
        <div className="flex justify-between h-full container mx-auto px-10">
          {pathMatch && (
            <Button
              primary
              classNames="px-1 flex items-center justify-center gap-x-2"
              onClickHandler={() => navigate(`${location.pathname}/${AppRoutes.newField}`)}
            >
              <span>Add Field</span>
              <img className="w-4" src={add} alt="add" />
            </Button>
          )}
          <Button primary classNames="max-w-24 ml-auto" onClickHandler={() => navigate(AppRoutes.boards)}>
            Boards
          </Button>
        </div>
      </div>
    </>
  );
};
