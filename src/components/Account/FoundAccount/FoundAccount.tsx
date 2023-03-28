import { Button } from '@Common/Button/Button';
import { Account } from '@Types/entities/account.model';
import { FC } from 'react';

type FoundAccountProps = {
  account: Account;
  onClick: () => Promise<void>;
};

const FoundAccount: FC<FoundAccountProps> = ({ account, onClick }) => {
  return (
    <div className="w-100 border border-solid border-gray-300 rounded-3xl py-3 px-5 flex cursor-pointer items-center hover:border-gray-500">
      <h4 className="font-bold text-2xl text-slate-800 flex-grow">{account.name}</h4>
      <Button classNames="max-w-40" primary onClickHandler={onClick}>
        Add
      </Button>
    </div>
  );
};

export default FoundAccount;
