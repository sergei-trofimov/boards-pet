import { AuthResponse, isAuthResponseGuard } from '@Types/api/auth-reponses.model';
import { FC, useEffect } from 'react';
import { useActionData, useNavigate } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { SignUp } from '@Components/SignUp/SignUp';
import { authActions } from '@Auth-state/auth-slice';
import { useDispatch } from 'react-redux';

export const SignUpPage: FC = () => {
  const data = useActionData() as AuthResponse | Response;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthResponseGuard(data)) {
      dispatch(authActions.login(data));

      navigate(`/${AppRoutes.boards}`);
    }
  }, [data, dispatch, navigate]);

  return <SignUp />;
};
