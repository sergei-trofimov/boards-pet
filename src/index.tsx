import './main.scss';
import './utils/polyfills';
import App from './App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import store from './store/store';
import { RootStoreProvider } from '@App-store/mobx/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <RootStoreProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </RootStoreProvider>
);
