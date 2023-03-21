import { AuthResponse, isAuthResponseGuard } from '@Types/api/auth-reponses.model';
import { FC, useEffect } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { Login } from '@Components/Login/Login';
import { observer } from 'mobx-react-lite';
import { useRootStoreContext } from '@App-store/mobx/store';

const LoginPage: FC = () => {
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
  }, [login, navigate, data]);

  return <Login />;
};

export default observer(LoginPage);
