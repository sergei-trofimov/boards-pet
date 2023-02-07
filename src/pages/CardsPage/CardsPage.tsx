import { FC, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { cardThunks } from '@App-store/cards/actions';
import { useAppDispatch } from '@App-store/store';

export const CardsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  useEffect(() => {
    dispatch(cardThunks.fetchsCard(boardId));
  }, [dispatch, boardId]);

  return <Outlet />;
};
