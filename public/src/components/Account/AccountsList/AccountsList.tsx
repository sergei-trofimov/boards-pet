import { Account } from '@Types/entities/account.model';
import { FC } from 'react';
import AccountItem from '../AccountItem/AccountItem';
import { AccountsListProps } from './types';

const AccountList: FC<AccountsListProps> = ({ accounts }) => {
  return (
    <div>
      <h3 className="font-bold text-4xl text-slate-800 mb-3 ml-5">Accounts:</h3>
      {accounts.map((account: Account) => (
        <AccountItem key={account.id} account={account} />
      ))}
    </div>
  );
};

export default AccountList;
