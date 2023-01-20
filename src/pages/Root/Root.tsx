import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout: FC = () => {
  return <Outlet />;
};

export default RootLayout;
