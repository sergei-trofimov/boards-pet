import { FC, FormEvent, useCallback, useEffect } from 'react';
import { addBoardsThunk, fetchBoardsThunk } from '@Boards-state/thunks/boards';
import { useAppDispatch, useAppSelector } from '@App-store/store';
import { BoardsList } from '@Components/BoadrsList/BoardsList';

export const BoardsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, boards } = useAppSelector((state) => ({ ...state.boards }));

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const { title } = Object.fromEntries(formData) as { [key: string]: string };

      form.reset();
      dispatch(addBoardsThunk({ title }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  return (
    <div className="container px-10 mx-auto">
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="title" />
        <button>Send</button>
      </form>
      {isLoading ? <p>loading...</p> : <BoardsList boards={boards} />}
    </div>
  );
};
