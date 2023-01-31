import { AuthReponse, isAuthReponseGuard } from '@Types/api/auth-reponses.model';
import { FC, useEffect } from 'react';
import { RootState, useAppSelector } from 'src/store/store';
import { useActionData, useNavigate } from 'react-router-dom';
import { SignUp } from '@Components/SignUp/SignUp';
import { authActions } from '@Auth-state/auth-slice';
import { useDispatch } from 'react-redux';

export const SignUpPage: FC = () => {
  const isAuth: boolean = useAppSelector((state: RootState) => state.auth.isAuth);
  const data = useActionData() as AuthReponse | Response;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }

    if (isAuthReponseGuard(data)) {
      dispatch(authActions.login(data));

      navigate('/');
    }
  }, [isAuth, data, dispatch, navigate]);

  return <SignUp />;
};
