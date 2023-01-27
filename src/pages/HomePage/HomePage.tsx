import { AppRoutes } from '@Constants/app-routes';
import { Button } from '@Common/Button/Button';
import { Card } from '@Common/Card/Card';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center">
      <Card horizontalCentered classNames="w-135 h-80 -mt-46">
        <div className="flex flex-col justify-center items-center gap-y-5 h-full">
          <Button primary onClickHandler={() => navigate(AppRoutes.login)}>
            Log In
          </Button>
          <Button primary onClickHandler={() => navigate(AppRoutes.signup)}>
            Sign Up
          </Button>
        </div>
      </Card>
    </div>
  );
};
