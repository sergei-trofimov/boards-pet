import { Animation } from '@Common/Animation/Animation';
import { AnimationsName } from '@Constants/animations-name.constant';
import { AppRoutes } from '@Constants/app-routes';
import { Card } from '@Types/entities/card.model';
import { CardsItem } from '../CardsItem/CardsItem';
import { CreateNewEntity } from '@Common/CreateNewEntity/CreateNewEntity';
import { FC } from 'react';
import { useAppSelector } from '@App-store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { FieldTypeEnum } from '@Components/Field/NewField/types';
import { Button } from '@Common/Button/Button';

export const CardsList: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, cards, selectInputs, checkboxInputs } = useAppSelector((state) => {
    const loading = state.cards.isLoading || state.boards.isLoading;
    const cards = state.cards.cards;
    const relatedFields = (state.boards.boards.find(({ id }) => id === params.boardId)?.relatedFields || []);
    const selectInputs = relatedFields.filter(({ type }) => type === FieldTypeEnum.SELECT);
    const checkboxInputs = relatedFields.filter(({ type }) => type === FieldTypeEnum.CHECKBOX);

    return { isLoading: loading, cards, selectInputs, checkboxInputs }
  });

  return (
    <div className="container px-10 mx-auto overflow-auto flex-grow">
      <div className="flex gap-x-3 items-baseline">
        <h4 className="font-main font-bold text-4xl text-slate-600">Group By: </h4>
        {selectInputs.map((input) => (
          <Button primary classNames="!w-fit px-2" key={input.id}>
            {input.label}
          </Button>
        ))}
        {checkboxInputs.map((input) => (
          <Button primary classNames="!w-fit px-2" key={input.id}>
            {input.label}
          </Button>
        ))}
      </div>
      {isLoading ? (
        <Animation animationConfig={{ style: { height: '320px' } }} animationName={AnimationsName.CIRCLE_LOADER} />
      ) : cards?.length ? (
        <div className="grid grid-cols-auto grid-rows-min-h auto-rows-m gap-5 py-3">
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
