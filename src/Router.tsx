import { NotFoundPage, RootLayout } from '@Pages';
import { RouteObject } from 'react-router-dom';

const routerConfig: RouteObject[] = [
  { path: '/', element: <RootLayout />, children: [{ path: '*', element: <NotFoundPage /> }] },
];

export default routerConfig;
