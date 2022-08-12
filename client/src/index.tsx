import ReactDOM from 'react-dom/client';
import '@src/index.css';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import App from '@src/App';
import { store, persistor } from '@store/store';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </CookiesProvider>,
);
