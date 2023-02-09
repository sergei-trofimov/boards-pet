import { AppRoutesInterface } from '@Types/routes/routes.interface';

export const AppRoutes: AppRoutesInterface = {
  login: 'login',
  signup: 'signup',
  logout: 'logout',
  boards: 'boards',
  editBoard: 'boards/:boardId/edit',
  cards: 'boards/:boardId/cards',
  editCard: ':cardId/edit',
};
