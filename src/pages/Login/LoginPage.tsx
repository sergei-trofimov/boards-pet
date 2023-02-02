import { AuthResponse, isAuthResponseGuard } from '@Types/api/auth-reponses.model';
import { FC, useEffect } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { Login } from '@Components/Login/Login';
import { authActions } from '@Auth-state/auth-slice';
import { useDispatch } from 'react-redux';

export const LoginPage: FC = () => {
  const data = useActionData() as AuthResponse | Response;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthResponseGuard(data)) {
      dispatch(authActions.login(data));

      navigate(`/${AppRoutes.boards}`);
    }
  }, [dispatch, navigate, data]);

  return <Login />;
};
