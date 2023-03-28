import { AuthResponse, isAuthResponseGuard } from '@Types/api/auth-reponses.model';
import { FC, useEffect } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { SignUp } from '@Components/SignUp/SignUp';
import { observer } from 'mobx-react-lite';
import { useRootStoreContext } from '@App-store/mobx/store';

const SignUpPage: FC = () => {
  const data = useActionData() as AuthResponse | Response;
  const navigate = useNavigate();
  const { login, isAuth } = useRootStoreContext().auth;

  useEffect(() => {
    if (isAuth) {
      navigate(`/${AppRoutes.boards}`);
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    if (isAuthResponseGuard(data)) {
      login(data);
      navigate(`/${AppRoutes.boards}`);
    }
  }, [data, login, navigate]);

  return <SignUp />;
};

export default observer(SignUpPage);
