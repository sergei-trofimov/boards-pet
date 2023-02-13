import { FC, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@App-store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { Button } from '@Common/Button/Button';
import { Card } from '@Types/entities/card.model';
import { CardUI } from '@Common/CardUI/CardUI';
import { cardThunks } from '@App-store/cards/actions';

export const CardEdit: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cardId, boardId } = useParams();
  const [isEditMode] = useState(cardId !== 'new');
  const card: Card = useAppSelector((state) => state.cards.cards.find(({ id }) => id === cardId));

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { title } = Object.fromEntries(formData) as { [key: string]: string };

    if (card?.title !== title) {
      dispatch(isEditMode ? cardThunks.editCard({ ...card, title }) : cardThunks.createCard({ title, boardId }));
    }

    navigate(`/${AppRoutes.cards.replace(':boardId', boardId)}`);
  };

  return (
    <CardUI horizontalCentered classNames="w-96 flex flex-col gap-y-2 justify-center items-center">
      <form onSubmit={handleFormSubmit} className="flex flex-col min-w-9/10 gap-y-4 items-center py-8">
        <h4 className="font-main font-bold text-4xl text-slate-600">
          {isEditMode ? 'Update card title' : 'Create name of card'}
        </h4>
        <input
          className="form-label__input w-full"
          type="text"
          name="title"
          defaultValue={card?.title || ''}
          required
        />
        <Button type="submit" primary>
          Save
        </Button>
      </form>
    </CardUI>
  );
};
