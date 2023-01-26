import { FC, FormEvent } from 'react';
import { Button } from '@Common/Button/Button';
import { Card } from '@Common/Card/Card';

export const SignUp: FC = () => {
  const formSubmitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="h-full flex items-center">
      <Card
        horizontalCentered
        classNames="w-135 -mt-46 flex flex-col justify-center items-center gap-y-6 font-main py-16"
      >
        <h2 className="text-7xl font-bold">Sign Up</h2>
        <form onSubmit={formSubmitHanlder} className="flex flex-col gap-y-4 w-89">
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
            <input className="form-label__input" type="password" name="repeat-password" minLength={6} required />
          </label>
          <Button horizontalCentered primary classNames="mt-4" type="submit">
            Sign Up
          </Button>
        </form>
        <span className="validation-error">
          Email or password was entered incorrectly! Check the data and try again.
        </span>
      </Card>
    </div>
  );
};
