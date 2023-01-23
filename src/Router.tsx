import { NotFoundPage } from '@Pages/NotFound/NotFound';
import { RootLayout } from '@Pages/Root/Root';
import { RouteObject } from 'react-router-dom';

export const routerConfig: RouteObject[] = [
  { path: '/', element: <RootLayout />, children: [{ path: '*', element: <NotFoundPage /> }] },
];
