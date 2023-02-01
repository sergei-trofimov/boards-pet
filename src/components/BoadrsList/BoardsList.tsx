import { BoardsItem } from '@Components/BoardsItem/BoardsItem';
import { FC } from 'react';

export const BoardsList: FC = () => {
  return (
    <div>
      {/* temporary stub value */}
      {new Array(5).fill('').map((_, i) => <BoardsItem key={i} />)}
    </div>
  );
};
