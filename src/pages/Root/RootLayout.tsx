import { FC, useEffect } from 'react';
import { Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from 'src/store/store';
import { AppRoutes } from '@Constants/app-routes';
import { AuthResponse } from '@Types/api/auth-reponses.model';
import { authActions } from '@Auth-state/auth-slice';
import { useDispatch } from 'react-redux';

export const RootLayout: FC = () => {
  const data = useLoaderData() as AuthResponse | null;
  const dispatch = useDispatch();
  const isAuth: boolean = useAppSelector((state: RootState) => state.auth.isAuth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuth && location.pathname === '/') {
      navigate(AppRoutes.boards);
    }
  }, [isAuth, navigate, location]);

  useEffect(() => {
    if (data) {
      dispatch(authActions.login(data));
    }
  }, [data, dispatch]);

  return <Outlet />;
};
