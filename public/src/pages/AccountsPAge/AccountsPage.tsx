import { useRootStoreContext } from '@App-store/mobx/store';
import AccountList from '@Components/Account/AccountsList/AccountsList';
import NewAccount from '@Components/Account/NewAccount/NewAccount';
import { observer } from 'mobx-react';
import { FC } from 'react';

const AccountsPage: FC = () => {
  const { accounts, createAccountAsync } = useRootStoreContext().accounts;

  return (
    <div className="flex justify-between h-full container mx-auto px-10">
      {accounts.length ? <AccountList accounts={accounts} /> : <NewAccount onSubmit={createAccountAsync} />}
    </div>
  );
};

export default observer(AccountsPage);
