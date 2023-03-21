import { FC, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useRootStoreContext } from '@App-store/mobx/store';
import { observer } from 'mobx-react-lite';

const CardsPage: FC = () => {
  const { boardId } = useParams();
  const { fetchCardsByBoardIdAsync } = useRootStoreContext().cards;

  useEffect(() => {
    fetchCardsByBoardIdAsync(boardId);
  }, [fetchCardsByBoardIdAsync, boardId]);

  return <Outlet />;
};

export default observer(CardsPage);
