import { RouteObject, redirect } from 'react-router-dom';
import { AppRoutes } from '@Constants/app-routes';
import { action as AuthAction } from '@Pages/SignUp/actions/auth-action';
import AuthRoutesGuard from '@Components/routes-guard/AuthRoutesGuard/AuthRoutesGuard';
import { BoardEdit } from '@Components/Board/BoardEdit/BoardEdit';
import { BoardsPage } from '@Pages/BoardsPage/BoardsPage';
import { CardEdit } from '@Components/Card/CardEdit/CardEdit';
import { CardsList } from '@Components/Card/CardsList/CardsList';
import { CardsPage } from '@Pages/CardsPage/CardsPage';
import { loader as ForceAuthLoader } from '@Pages/SignUp/loaders/force-auth-loader';
import { HomePage } from '@Pages/HomePage/HomePage';
import LoginPage from '@Pages/Login/LoginPage';
import { NewField } from '@Components/Field/NewField/NewField';
import { RootErrorPage } from '@Pages/RootError/RootErrorPage';
import RootLayout from '@Pages/Root/RootLayout';
import SignUpPage from '@Pages/SignUp/SignUpPage';

export const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    loader: ForceAuthLoader,
    shouldRevalidate: () => false,
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
              {
                path: 'boards/:boardId',
                loader: (): Response => redirect('cards'),
              },
              {
                path: AppRoutes.editBoard,
                element: <BoardEdit />,
              },
              {
                path: AppRoutes.cards,
                element: <CardsPage />,
                children: [
                  { index: true, element: <CardsList /> },
                  {
                    path: AppRoutes.editCard,
                    element: <CardEdit />,
                  },
                  {
                    path: AppRoutes.newField,
                    element: <NewField />,
                  },
                ],
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
