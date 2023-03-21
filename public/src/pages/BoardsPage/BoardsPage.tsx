import { Animation } from '@Common/Animation/Animation';
import { AnimationsName } from '@Constants/animations-name.constant';
import { AppRoutes } from '@Constants/app-routes';
import { BoardsList } from '@Components/Board/BoadrsList/BoardsList';
import { CreateNewEntity } from '@Common/CreateNewEntity/CreateNewEntity';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStoreContext } from '@App-store/mobx/store';

const BoardsPage: FC = () => {
  const navigate = useNavigate();
  const { isLoading, boards } = useRootStoreContext().boards;

  return (
    <div className="container px-10 mx-auto overflow-auto flex-grow">
      {isLoading ? (
        <Animation animationConfig={{ style: { height: '320px' } }} animationName={AnimationsName.CIRCLE_LOADER} />
      ) : boards.length ? (
        <BoardsList boards={boards} />
      ) : (
        <CreateNewEntity
          cardClasses="w-96 h-48 flex flex-col gap-y-2 justify-center items-center cursor-pointer"
          onClickHandler={() => navigate(`/${AppRoutes.editBoard.replace(':boardId', 'new')}`)}
          horizontalCentered
        >
          <h3 className="font-main font-bold text-5xl text-slate-600">Create your first board</h3>
        </CreateNewEntity>
      )}
    </div>
  );
};

export default observer(BoardsPage);
