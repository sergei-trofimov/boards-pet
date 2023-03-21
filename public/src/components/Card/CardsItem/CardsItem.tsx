import { bin, pencil } from '@Icons';
import { Button } from '@Common/Button/Button';
import { CardUI } from '@Common/CardUI/CardUI';
import { CardsItemProps } from './types';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldsContainer } from '@Components/Field/FieldsContainer/FieldsContainer';
import { useRootStoreContext } from '@App-store/mobx/store';
import { observer } from 'mobx-react-lite';
import { action } from 'mobx';

const CardsItem: FC<CardsItemProps> = ({ card }) => {
  const { title } = card;
  const navigate = useNavigate();
  const { deleteCardAsync } = useRootStoreContext().cards;

  return (
    <CardUI classNames="font-main p-4 flex flex-col gap-y-2 overflow-hidden">
      <div className="flex justify-between items-center">
        <h3 title={title} className="font-bold text-4xl text-slate-800">
          {title}
        </h3>
        <div className="flex gap-x-2 pr-1">
          <Button onClickHandler={() => navigate(`${card.id}/edit`, { state: card })}>
            <img src={pencil} alt="edit board" className="w-4" />
          </Button>
          <Button onClickHandler={action(() => deleteCardAsync(card))}>
            <img src={bin} alt="delete board" className="w-4" />
          </Button>
        </div>
      </div>
      {card.fields && (
        <>
          <span className="h-px w-full bg-slate-300" />
          <FieldsContainer card={card} />
        </>
      )}
    </CardUI>
  );
};

export default observer(CardsItem);
