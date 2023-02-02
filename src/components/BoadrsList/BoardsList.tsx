import { BoardsItem } from '@Components/BoardsItem/BoardsItem';
import { Board } from '@Types/entities/board.model';
import { FC } from 'react';

export const BoardsList: FC = ({ boards }) => {
  return (
    <div>
      {/* temporary stub value */}
      {boards.map((board: Board) => (
        <BoardsItem key={board.id} title={board.title} />
      ))}
    </div>
  );
};
