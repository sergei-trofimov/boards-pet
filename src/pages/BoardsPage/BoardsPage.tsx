import { BoardsList } from '@Components/BoadrsList/BoardsList';
import { FC } from 'react';

export const BoardsPage: FC = () => {
  return (
    <div className="container px-10 mx-auto">
      <BoardsList />
    </div>
  );
};
