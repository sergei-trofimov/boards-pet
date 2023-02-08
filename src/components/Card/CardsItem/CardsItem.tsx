import { bin, pencil } from '@Icons';
import { Button } from '@Common/Button/Button';
import { CardUI } from '@Common/CardUI/CardUI';
import { CardsItemProps } from './types';
import { FC } from 'react';
import { cardThunks } from '@App-store/cards/actions';
import { useAppDispatch } from '@App-store/store';
import { useNavigate } from 'react-router-dom';

export const CardsItem: FC<CardsItemProps> = ({ card }) => {
  const { title } = card;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removeBoardHandler = () => {
    dispatch(cardThunks.deleteCard(card));
  };

  return (
    <CardUI classNames="font-main p-4 flex flex-col gap-y-4">
      <div className="flex justify-between items-center">
        <h3 title={title} className="font-bold text-4xl text-slate-800">
          {title}
        </h3>
        <div className="flex gap-x-2 pr-1">
          <Button onClickHandler={() => navigate(`${card.id}/edit`)}>
            <img src={pencil} alt="edit board" className="w-4" />
          </Button>
          <Button onClickHandler={removeBoardHandler}>
            <img src={bin} alt="delete board" className="w-4" />
          </Button>
        </div>
      </div>
    </CardUI>
  );
};
