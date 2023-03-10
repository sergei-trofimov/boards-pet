import { AuthErrorKeys, AuthErrorMapper } from '@Constants/auth-error-mapper.constant';
import { FC, useEffect, useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { Button } from '@Common/Button/Button';
import { CardUI } from '@Common/CardUI/CardUI';
import { ErrorResponse } from '@Types/api/error-response.model';

export const SignUp: FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const errorData = useActionData() as ErrorResponse<AuthErrorKeys>;
  const navigation = useNavigation();

  useEffect(() => {
    if (errorData && 'message' in errorData) {
      setErrorMessage(AuthErrorMapper[errorData.message]);
    }
  }, [errorData, errorMessage]);

  return (
    <div className="h-full flex items-center">
      <CardUI
        horizontalCentered
        classNames="w-135 -mt-46 flex flex-col justify-center items-center gap-y-6 font-main py-16"
      >
        <h2 className="text-7xl font-bold">Sign Up</h2>
        <Form method="post" action={`/${AppRoutes.signup}`} className="flex flex-col gap-y-4 w-89">
          <label className="form-label">
            <span className="form-label__title">Email</span>
            <input className="form-label__input" type="email" name="email" required />
          </label>
          <label className="form-label">
            <span className="form-label__title">Password</span>
            <input className="form-label__input" type="password" name="password" minLength={6} required />
          </label>
          <label className="form-label">
            <span className="form-label__title">Repeat Password</span>
            <input className="form-label__input" type="password" name="repeatPassword" minLength={6} required />
          </label>
          <Button loading={navigation.state !== 'idle'} horizontalCentered primary classNames="mt-4" type="submit">
            Sign Up
          </Button>
        </Form>
        {errorMessage && <span className="validation-error">{errorMessage}</span>}
      </CardUI>
    </div>
  );
};
