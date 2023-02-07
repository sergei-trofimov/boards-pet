import { bin, pencil } from '@Icons';
import { AppRoutes } from '@Constants/app-routes';
import { BoardsItemProps } from './types';
import { Button } from '@Common/Button/Button';
import { CardUI } from '@Common/CardUI/CardUI';
import { FC } from 'react';
import { removeBoardThunk } from '@App-store/boards/thunks/boards';
import { useAppDispatch } from '@App-store/store';
import { useNavigate } from 'react-router-dom';

export const BoardsItem: FC<BoardsItemProps> = ({ board }) => {
  const { title, id } = board;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removeBoardHandler = () => {
    dispatch(removeBoardThunk(board.id));
  };

  return (
    <CardUI classNames="font-main p-4 flex flex-col gap-y-4">
      <div className="flex justify-between items-center">
        <h3 title={title} className="font-bold text-4xl text-slate-800">
          {title}
        </h3>
        <div className="flex gap-x-2 pr-1">
          <Button onClickHandler={() => navigate(`/${AppRoutes.editBoard.replace(':boardId', id)}`)}>
            <img src={pencil} alt="edit board" className="w-4" />
          </Button>
          <Button onClickHandler={removeBoardHandler}>
            <img src={bin} alt="delete board" className="w-4" />
          </Button>
        </div>
      </div>
      <p className="text-base">Total amount of cards: {board?.relatedCardsId?.length || 0}</p>
      <Button
        primary
        classNames="min-w-full"
        onClickHandler={() => navigate(`/${AppRoutes.cards.replace(':boardId', id)}`)}
      >
        More
      </Button>
    </CardUI>
  );
};
