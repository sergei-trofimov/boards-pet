import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import Header from '@Components/Header/Header';

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      navigate(AppRoutes.boards);
    }
  }, [pathname, navigate]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
