import { Animation } from '@Common/Animation/Animation';
import { AnimationsName } from '@Constants/animations-name.constant';
import { AppRoutes } from '@Constants/app-routes';
import { Card } from '@Types/entities/card.model';
import CardsItem from '../CardsItem/CardsItem';
import { CreateNewEntity } from '@Common/CreateNewEntity/CreateNewEntity';
import { FC } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FieldTypeEnum } from '@Components/Field/NewField/types';
import { Button } from '@Common/Button/Button';
import { BaseFormFieldDisplayModel } from '@Types/form/form-data-to-display.models';
import DragAndDrop from '@Common/DragAndDrop/DragAndDrop';
import { useRootStoreContext } from '@App-store/mobx/store';
import { observer } from 'mobx-react-lite';

const groupBy = 'groupBy';

const CardsList: FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();
  const {
    boards: { isLoading: boardsIsLoading, getBoardById, getRelatedFieldsByFieldType },
    cards: { isLoading: cardsIsLoading, cards },
  } = useRootStoreContext();
  const board = getBoardById(params.boardId);
  const selectInputs = getRelatedFieldsByFieldType(board, FieldTypeEnum.SELECT);
  const checkboxInputs = getRelatedFieldsByFieldType(board, FieldTypeEnum.CHECKBOX);

  const groupByHandler = (name: string) => {
    if (!name) {
      searchParams.delete(groupBy);
      setSearchParams(searchParams);
    } else {
      setSearchParams({ groupBy: name });
    }
  };

  return (
    <div className="container px-10 mx-auto overflow-auto flex-grow">
      <div className="flex gap-x-3 items-baseline">
        <h4 className="font-main font-bold text-4xl text-slate-600">Group By: </h4>
        <Button primary classNames="!w-fit px-2" onClickHandler={() => groupByHandler(null)}>
          ALL
        </Button>
        {selectInputs.concat(checkboxInputs).map((input: BaseFormFieldDisplayModel) => (
          <Button
            primary
            classNames={`!w-fit px-2 ${searchParams.get(groupBy) === input.name && '!bg-slate-400'}`}
            key={input.id}
            onClickHandler={() => groupByHandler(input.name)}
          >
            {input.label}
          </Button>
        ))}
      </div>
      {cardsIsLoading || boardsIsLoading ? (
        <Animation animationConfig={{ style: { height: '320px' } }} animationName={AnimationsName.CIRCLE_LOADER} />
      ) : cards?.length ? (
        searchParams.get(groupBy) ? (
          <DragAndDrop board={board} cards={cards} groupBy={searchParams.get(groupBy)} />
        ) : (
          <div className="grid grid-cols-auto grid-rows-min-h auto-rows-m gap-5 py-3">
            {cards.map((card: Card) => (
              <CardsItem key={card.id} card={card} />
            ))}
            <CreateNewEntity
              cardClasses="grid place-content-center cursor-pointer"
              onClickHandler={() => navigate(`${AppRoutes.editCard.replace(':cardId', 'new')}`)}
            />
          </div>
        )
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

export default observer(CardsList);
