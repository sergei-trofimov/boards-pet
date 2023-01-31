import { AuthReponse, isAuthReponseGuard } from '@Types/api/auth-reponses.model';
import { FC, useEffect } from 'react';
import { RootState, useAppSelector } from 'src/store/store';
import { useActionData, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { Login } from '@Components/Login/Login';
import { authActions } from '@Auth-state/auth-slice';
import { useDispatch } from 'react-redux';

export const LoginPage: FC = () => {
  const isAuth: boolean = useAppSelector((state: RootState) => state.auth.isAuth);
  const data = useActionData() as AuthReponse | Response;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(`/${AppRoutes.boards}`);
    }

    if (isAuthReponseGuard(data)) {
      dispatch(authActions.login(data));

      navigate(`/${AppRoutes.boards}`);
    }
  }, [isAuth, dispatch, navigate, data]);

  return <Login />;
};
