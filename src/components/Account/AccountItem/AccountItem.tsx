import { useRootStoreContext } from '@App-store/mobx/store';
import { AppRoutes } from '@Constants/app-routes';
import { observer } from 'mobx-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccountItemProps } from './types';

const AccountItem: FC<AccountItemProps> = ({ account }) => {
  const navigate = useNavigate();
  const {
    boards: { getAllBoardsAsync },
    accounts: { setAccount },
  } = useRootStoreContext();

  const handleClick = async () => {
    setAccount(account);
    await getAllBoardsAsync(account.boardsId);
    navigate(`/${AppRoutes.boards}`);
  };

  return (
    <div
      className="w-100 border border-solid border-gray-300 rounded-3xl py-3 px-5 flex cursor-pointer hover:border-gray-500"
      onClick={handleClick}
    >
      <h4 className="font-bold text-2xl text-slate-800 flex-grow">{account.name}</h4>
      <div>
        <span>Boards: </span>
        <span>{account.boardsId?.length ?? 0}</span>
      </div>
    </div>
  );
};

export default observer(AccountItem);
