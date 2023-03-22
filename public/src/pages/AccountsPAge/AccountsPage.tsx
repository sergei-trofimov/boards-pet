import { useRootStoreContext } from '@App-store/mobx/store';
import AccountList from '@Components/Account/AccountsList/AccountsList';
import NewAccount from '@Components/Account/NewAccount/NewAccount';
import { AnimationsName } from '@Constants/animations-name.constant';
import { observer } from 'mobx-react';
import { FC, useEffect } from 'react';
import { Animation } from '@Common/Animation/Animation';

const AccountsPage: FC = () => {
  const { accounts, createAccountAsync, isLoading, getUserAccountsAsync } = useRootStoreContext().accounts;

  useEffect(() => {
    getUserAccountsAsync();
  }, []);

  return isLoading ? (
    <Animation animationConfig={{ style: { height: '320px' } }} animationName={AnimationsName.CIRCLE_LOADER} />
  ) : (
    <div className="flex justify-between h-full container mx-auto px-10">
      {accounts.length ? (
        accounts.length === 1 ? (
          <div className="flex flex-col gap-y-16 mx-auto">
            <AccountList accounts={accounts} />
            <NewAccount onSubmit={createAccountAsync} />
          </div>
        ) : (
          <div className="mx-auto">
            <AccountList accounts={accounts} />
          </div>
        )
      ) : (
        <div className="mx-auto">
          <NewAccount onSubmit={createAccountAsync} />
        </div>
      )}
    </div>
  );
};

export default observer(AccountsPage);
