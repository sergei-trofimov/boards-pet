import { Auth } from '@Components/Auth/Auth';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@App-store/store';

export const AuthRoutesGuard = () => {
  const isAuth: boolean = useAppSelector((state) => state.auth.isAuth);

  return isAuth ? <Outlet /> : <Auth />;
};
