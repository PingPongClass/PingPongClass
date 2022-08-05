import ReactDOM from 'react-dom/client';
import '@src/index.css';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import App from '@src/App';
import store from '@store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>,
);
