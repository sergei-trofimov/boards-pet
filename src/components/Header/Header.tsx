import { FC, MutableRefObject, useCallback } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { Button } from '@Common/Button/Button';
import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import { add } from '@Icons';
import { useRootStoreContext } from '@App-store/mobx/store';
import { observer } from 'mobx-react-lite';
import InviteUser from '@Components/InviteUser/InviteUser';
import { FormikProps } from 'formik';
import { InviteUserPayload } from '@Types/api/invite-user-payload.model';

const Header: FC = () => {
  const navigate = useNavigate();
  const cardsPathMatch = useMatch(AppRoutes.cards);
  const accountPathMatch = useMatch(AppRoutes.accounts);
  const boardsPathMatch = useMatch(AppRoutes.boards);
  const location = useLocation();
  const {
    auth: { logout, user },
    ui: { openModal, sendInvitation },
    accounts: { currentAccount },
  } = useRootStoreContext();

  const handleLogoutClick = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.ID_TOKEN);
    localStorage.removeItem(LocalStorageKeys.LOCAL_ID);
    localStorage.removeItem(LocalStorageKeys.EXPIRATION_TIME);

    logout();
    navigate('/');
  }, [navigate, logout]);

  const open = useCallback(() => {
    let email: string;
    const onSubmit = (ref: MutableRefObject<FormikProps<{ email: string }>>) => {
      email = ref.current?.values.email;
    };

    openModal(<InviteUser onSubmit={onSubmit} />, {
      onAgree: () => {
        const payload: InviteUserPayload = {
          from: user.email,
          to: email,
          accountId: currentAccount.id,
          accountName: currentAccount.name,
        };
        sendInvitation(payload);
      },
    });
  }, [user, currentAccount]);

  return (
    <>
      <div className="flex justify-between items-center mx-auto container px-10 my-3">
        <div className="h-9 w-9 rounded-full overflow-hidden">
          <img src={process.env[ENVIRONMENT_CONFIG.RANDOM_AVATAR]} alt="avatar" />
        </div>
        <div className="flex gap-x-2">
          {boardsPathMatch && (
            <Button primary classNames="max-w-40" onClickHandler={open}>
              Invite user
            </Button>
          )}
          <Button primary classNames="max-w-24" onClickHandler={handleLogoutClick}>
            Log Out
          </Button>
        </div>
      </div>
      <div className="h-10 bg-slate-100 mb-6">
        <div className="flex justify-between h-full container mx-auto px-10">
          {!accountPathMatch && (
            <>
              {cardsPathMatch && (
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default observer(Header);
