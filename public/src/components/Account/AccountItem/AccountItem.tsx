import { Account } from '@Types/entities/account.model';
import { FC } from 'react';

type AccountItemProps = {
  account: Account;
};

const AccountItem: FC<AccountItemProps> = ({ account }) => {
  return <div>{account.name}</div>;
};

export default AccountItem;
