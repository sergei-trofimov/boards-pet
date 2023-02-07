import { FC, FormEvent, useState } from 'react';
import { addBoardsThunk, editBoardThunk } from '@App-store/boards/thunks/boards';
import { useAppDispatch, useAppSelector } from '@App-store/store';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { Board } from '@Types/entities/board.model';
import { Button } from '@Common/Button/Button';
import { CardUI } from '@Common/CardUI/CardUI';

export const BoardEdit: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [isEditMode] = useState(boardId !== 'new');
  const board: Board = useAppSelector((state) => state.boards.boards.find(({ id }) => id === boardId));

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const { title } = Object.fromEntries(formData) as { [key: string]: string };

    dispatch(isEditMode ? editBoardThunk({ ...board, title }) : addBoardsThunk({ title }));
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
