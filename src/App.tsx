import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { FC } from 'react';
import routerConfig from './Router';

export const router = createBrowserRouter(routerConfig);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
