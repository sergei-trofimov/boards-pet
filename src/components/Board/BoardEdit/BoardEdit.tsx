import { FC, FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { Board } from '@Types/entities/board.model';
import { Button } from '@Common/Button/Button';
import { CardUI } from '@Common/CardUI/CardUI';
import { useRootStoreContext } from '@App-store/mobx/store';
import { observer } from 'mobx-react-lite';

const BoardEdit: FC = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [isEditMode] = useState(boardId !== 'new');
  const { createBoardAsync, editBoardAsync, getBoardById } = useRootStoreContext().boards;
  const board: Board = getBoardById(boardId);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title } = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as { [key: string]: string };

    isEditMode ? editBoardAsync({ ...board, title }) : createBoardAsync(title);
    navigate(`/${AppRoutes.boards}`);
  };

  return (
    <CardUI horizontalCentered classNames="w-96 flex flex-col gap-y-2 justify-center items-center">
      <form onSubmit={handleFormSubmit} className="flex flex-col min-w-9/10 gap-y-4 items-center py-8">
        <h4 className="font-main font-bold text-4xl text-slate-600">
          {isEditMode ? 'Update board title' : 'Create name of board'}
        </h4>
        <input
          className="form-label__input w-full"
          type="text"
          name="title"
          defaultValue={board?.title || ''}
          required
        />
        <Button type="submit" primary>
          Save
        </Button>
      </form>
    </CardUI>
  );
};

export default observer(BoardEdit);
