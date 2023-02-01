import { ENVIRONMENT_CONFIG } from '@Constants/env-config.constant';
import { LocalStorageKeys } from '@Constants/local-storage-keys.constant';
import axios from 'axios';
import { FC } from 'react';
import { useLoaderData } from 'react-router-dom';

export const BoardsPage: FC = () => {
  const data = useLoaderData();
  // console.log('BoardsPage ', data);

  return <div>Boards Page</div>;
};
