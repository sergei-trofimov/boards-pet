import { useRootStoreContext } from '@App-store/mobx/store';
import { Auth } from '@Components/Auth/Auth';
import { observer } from 'mobx-react';
import { Outlet } from 'react-router-dom';

const AuthRoutesGuard = () => {
  const { isAuth } = useRootStoreContext().auth;

  return isAuth ? <Outlet /> : <Auth />;
};

export default observer(AuthRoutesGuard);
