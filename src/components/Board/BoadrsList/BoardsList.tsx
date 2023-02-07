import { AppRoutes } from '@Constants/app-routes';
import { Board } from '@Types/entities/board.model';
import { BoardsItem } from '@Components/Board/BoardsItem/BoardsItem';
import { BoardsListProps } from './types';
import { Card } from '@Common/Card/Card';
import { FC } from 'react';
import { add } from '@Icons';
import { useNavigate } from 'react-router-dom';

export const BoardsList: FC<BoardsListProps> = ({ boards }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-auto gap-5 py-5">
      {boards.map((board: Board) => (
        <BoardsItem key={board.id} board={board} />
      ))}
      <Card
        classNames="grid place-content-center cursor-pointer"
        onClickHandler={() => navigate(`/${AppRoutes.editBoard.replace(':boardId', 'new')}`)}
      >
        <img src={add} className="w-10 text-blue-500" alt="create new board" />
      </Card>
    </div>
  );
};
