import { AppRoutes } from '@Constants/app-routes';
import { Board } from '@Types/entities/board.model';
import BoardsItem from '@Components/Board/BoardsItem/BoardsItem';
import { BoardsListProps } from './types';
import { CreateNewEntity } from '@Common/CreateNewEntity/CreateNewEntity';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const BoardsList: FC<BoardsListProps> = ({ boards }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-auto grid-rows-min-h auto-rows-m gap-5 py-5">
      {boards.map((board: Board) => (
        <BoardsItem key={board.id} board={board} />
      ))}
      <CreateNewEntity
        cardClasses="grid place-content-center cursor-pointer"
        onClickHandler={() => navigate(`/${AppRoutes.editBoard.replace(':boardId', 'new')}`)}
      />
    </div>
  );
};
