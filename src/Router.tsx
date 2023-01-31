import { AppRoutes } from '@Constants/app-routes';
import { action as AuthAction } from '@Pages/SignUp/actions/auth-action';
import { AuthRoutesGuard } from '@Components/routes-guard/AuthRoutesGuard/AuthRoutesGuard';
import { loader as ForceAuthLoader } from '@Pages/SignUp/loaders/force-auth-loader';
import { Home } from '@Components/Home/Home';
import { HomePage } from '@Pages/HomePage/HomePage';
import { LoginPage } from '@Pages/Login/LoginPage';
import { action as LogoutAction } from '@Pages/HomePage/actions/logout.action';
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
    shouldRevalidate: ({ currentUrl }) => {
      return currentUrl.pathname === '/';
    },
    children: [
      {
        path: '/',
        element: <AuthRoutesGuard />,
        children: [
          { path: '/', element: <HomePage />, children: [{ index: true, element: <Home /> }] },
        ],
      },
      { path: AppRoutes.logout, action: LogoutAction },
      { path: AppRoutes.login, element: <LoginPage />, action: AuthAction },
      { path: AppRoutes.signup, element: <SignUpPage />, action: AuthAction },
    ],
  },
];
