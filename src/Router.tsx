import { AppRoutes } from '@Constants/app-routes';
import { action as AuthAction } from '@Pages/SignUp/actions/auth-action';
import { AuthRoutesGuard } from '@Components/routes-guard/AuthRoutesGuard/AuthRoutesGuard';
import { BoardsPage } from '@Pages/BoardsPage/BoardsPage';
import { loader as ForceAuthLoader } from '@Pages/SignUp/loaders/force-auth-loader';
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
    loader: ForceAuthLoader,
    children: [
      {
        path: '/',
        element: <AuthRoutesGuard />,
        children: [
          {
            path: '/',
            element: <HomePage />,
            children: [
              {
                path: AppRoutes.boards,
                element: <BoardsPage />,
              },
            ],
          },
        ],
      },
      { path: AppRoutes.login, element: <LoginPage />, action: AuthAction },
      { path: AppRoutes.signup, element: <SignUpPage />, action: AuthAction },
    ],
  },
];
