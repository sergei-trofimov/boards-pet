import { bin, pencil } from '@Icons';
import { AppRoutes } from '@Constants/app-routes';
import { BoardsItemProps } from './types';
import { Button } from '@Common/Button/Button';
import { CardUI } from '@Common/CardUI/CardUI';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStoreContext } from '@App-store/mobx/store';
import { action } from 'mobx';

const BoardsItem: FC<BoardsItemProps> = ({ board }) => {
  const { title, id, relatedCardsId } = board;
  const navigate = useNavigate();
  const { removeBoardAsync } = useRootStoreContext().boards;

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
          <Button onClickHandler={action(() => removeBoardAsync(id))}>
            <img src={bin} alt="delete board" className="w-4" />
          </Button>
        </div>
      </div>
      <p className="text-base">Total amount of cards: {relatedCardsId?.length || 0}</p>
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

export default observer(BoardsItem);
