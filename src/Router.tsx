import { AppRoutes } from '@Constants/app-routes';
import { LoginPage } from '@Pages/Login/LoginPage';
import { RootErrorPage } from '@Pages/RootError/RootErrorPage';
import { RootLayout } from '@Pages/Root/RootLayout';
import { RouteObject } from 'react-router-dom';

export const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [{ path: AppRoutes.login, element: <LoginPage /> }],
  },
];
