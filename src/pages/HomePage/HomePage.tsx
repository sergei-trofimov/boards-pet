import { FC, useEffect } from 'react';
import { Outlet, useActionData, useNavigate } from 'react-router-dom';
import { Logout } from '@Types/api/auth-reponses.model';
import { authActions } from '@Auth-state/auth-slice';
import { useDispatch } from 'react-redux';

export const HomePage: FC = () => {
  const data = useActionData() as Logout | null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data?.mode === 'delete') {
      dispatch(authActions.logout());
      navigate('/');
    }
  }, [data, dispatch, navigate]);

  return <Outlet />;
};
