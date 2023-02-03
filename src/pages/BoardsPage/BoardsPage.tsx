import { Animation } from '@Common/Animation/Animation';
import { AnimationsName } from '@Constants/animations-name.constant';
import { AppRoutes } from '@Constants/app-routes';
import { BoardsList } from '@Components/Board/BoadrsList/BoardsList';
import { Card } from '@Common/Card/Card';
import { FC } from 'react';
import { add } from '@Icons';
import { useAppSelector } from '@App-store/store';
import { useNavigate } from 'react-router-dom';

export const BoardsPage: FC = () => {
  const navigate = useNavigate();
  const { isLoading, boards } = useAppSelector((state) => ({ ...state.boards }));

  return (
    <div className="container px-10 mx-auto overflow-auto flex-grow">
      {isLoading ? (
        <Animation animationConfig={{ style: { height: '320px' } }} animationName={AnimationsName.CIRCLE_LOADER} />
      ) : boards.length ? (
        <BoardsList boards={boards} />
      ) : (
        <Card
          horizontalCentered
          onClickHandler={() => navigate(`/${AppRoutes.editBoard.replace(':boardId', 'new')}`)}
          classNames="w-96 h-48 flex flex-col gap-y-2 justify-center items-center cursor-pointer"
        >
          <h3 className="font-main font-bold text-5xl text-slate-600">Create your first board</h3>
          <img src={add} alt="add" />
        </Card>
      )}
    </div>
  );
};
