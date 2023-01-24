import { NotFoundPage } from '@Pages/NotFound/NotFoundPage';
import { RootLayout } from '@Pages/Root/RootLayout';
import { RouteObject } from 'react-router-dom';

export const routerConfig: RouteObject[] = [
  { path: '/', element: <RootLayout />, children: [{ path: '*', element: <NotFoundPage /> }] },
];
