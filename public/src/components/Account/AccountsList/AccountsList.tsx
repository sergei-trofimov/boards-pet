import { Account } from '@Types/entities/account.model';
import { FC } from 'react';
import AccountItem from '../AccountItem/AccountItem';

type AccountsListProps = {
  accounts: Account[];
};

const AccountList: FC<AccountsListProps> = ({ accounts }) => {
  return (
    <>
      {accounts.map((account: Account) => {
        return <AccountItem key={account.id} account={account} />;
      })}
    </>
  );
};

export default AccountList;
