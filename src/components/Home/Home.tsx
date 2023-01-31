import { AppRoutes } from '@Constants/app-routes';
import { Button } from '@Common/Button/Button';
import { FC } from 'react';
import { Form } from 'react-router-dom';

export const Home: FC = () => {
  return (
    <div>
      <p>Home Component</p>
      <Form method="post" action={AppRoutes.logout}>
        <Button primary classNames='max-w-23' type='submit'>
          Logout
        </Button>
      </Form>
    </div>
  );
};
