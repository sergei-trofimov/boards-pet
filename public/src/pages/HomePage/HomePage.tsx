import { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import Header from '@Components/Header/Header';
import { observer } from 'mobx-react-lite';
import { useRootStoreContext } from '@App-store/mobx/store';

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentAccount } = useRootStoreContext().accounts;

  useEffect(() => {
    if (!currentAccount) {
      navigate(AppRoutes.accounts);
      return;
    }

    if (pathname === '/') {
      navigate(currentAccount ? AppRoutes.accounts : AppRoutes.boards);
      return;
    }
  }, [pathname, navigate, currentAccount]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default observer(HomePage);
