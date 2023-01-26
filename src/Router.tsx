import { AppRoutes } from '@Constants/app-routes';
import { HomePage } from '@Pages/HomePage/HomePage';
import { LoginPage } from '@Pages/Login/LoginPage';
import { RootErrorPage } from '@Pages/RootError/RootErrorPage';
import { RootLayout } from '@Pages/Root/RootLayout';
import { RouteObject } from 'react-router-dom';
import { SignUpPage } from '@Pages/SignUp/SignUpPage';

export const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: AppRoutes.login, element: <LoginPage /> },
      { path: AppRoutes.signup, element: <SignUpPage /> },
    ],
  },
];
