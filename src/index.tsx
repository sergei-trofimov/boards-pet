import './main.scss';
import './utils/polyfills';
import App from './App';
import ReactDOM from 'react-dom/client';
import { RootStoreProvider } from '@App-store/mobx/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <RootStoreProvider>
    <App />
  </RootStoreProvider>
);
