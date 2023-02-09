import { Animation } from '@Common/Animation/Animation';
import { AnimationsName } from '@Constants/animations-name.constant';
import { AppRoutes } from '@Constants/app-routes';
import { Card } from '@Types/entities/card.model';
import { CardsItem } from '../CardsItem/CardsItem';
import { CreateNewEntity } from '@Common/CreateNewEntity/CreateNewEntity';
import { FC } from 'react';
import { useAppSelector } from '@App-store/store';
import { useNavigate } from 'react-router-dom';

export const CardsList: FC = () => {
  const navigate = useNavigate();
  const { isLoading, cards } = useAppSelector((state) => ({ ...state.cards }));

  return (
    <div className="container px-10 mx-auto overflow-auto flex-grow">
      {isLoading ? (
        <Animation animationConfig={{ style: { height: '320px' } }} animationName={AnimationsName.CIRCLE_LOADER} />
      ) : cards?.length ? (
        <div className="grid grid-cols-auto grid-rows-min-h auto-rows-m gap-5 py-5">
          {cards.map((card: Card) => (
            <CardsItem key={card.id} card={card} />
          ))}
          <CreateNewEntity
            cardClasses="grid place-content-center cursor-pointer"
            onClickHandler={() => navigate(`${AppRoutes.editCard.replace(':cardId', 'new')}`)}
          />
        </div>
      ) : (
        <CreateNewEntity
          cardClasses="w-96 h-48 flex flex-col gap-y-2 justify-center items-center cursor-pointer"
          onClickHandler={() => navigate('new/edit')}
          horizontalCentered
        >
          <h3 className="font-main font-bold text-5xl text-slate-600">Create your first card</h3>
        </CreateNewEntity>
      )}
    </div>
  );
};
