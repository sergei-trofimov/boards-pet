import { FC, useEffect } from 'react';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { AuthResponse } from '@Types/api/auth-reponses.model';
import { useRootStoreContext } from '@App-store/mobx/store';
import { observer } from 'mobx-react-lite';

const RootLayout: FC = () => {
  const data = useLoaderData() as AuthResponse | null;
  const { isAuth, login } = useRootStoreContext().auth;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuth && location.pathname === '/') {
      navigate(AppRoutes.boards);
    }
  }, [isAuth, navigate, location]);

  useEffect(() => {
    if (data) {
      login(data);
    }
  }, [data]);

  return <Outlet />;
};

export default observer(RootLayout);
