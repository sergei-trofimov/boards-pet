import { isRouteErrorResponse, useRouteError } from 'react-router';
import { DefaultErrorPage } from '@Components/DefaultErrorPage/DefaultErrorPage';
import { NotFound } from '@Components/NotFound/NotFound';

export const RootErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return <NotFound />;

      default:
        return <DefaultErrorPage />;
    }
  }

  return <DefaultErrorPage />;
};
