import { FC, useEffect } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { AuthReponse } from '@Types/api/auth-reponses.model';
import { authActions } from '@Auth-state/auth-slice';
import { useDispatch } from 'react-redux';

export const RootLayout: FC = () => {
  const data = useLoaderData() as AuthReponse | null;
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(authActions.login(data));
    }
  }, [data, dispatch]);

  return <Outlet />;
};
