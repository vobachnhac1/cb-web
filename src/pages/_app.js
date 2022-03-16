import '../styles/globals.css'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as ReduxProvider } from 'react-redux';
import store, { persistor } from '../stores';
import { Provider } from 'use-http';

function ApplicationCustom({ Component, pageProps }) {
  const options = {
    headers: {
      Authorization: `Bearer ${pageProps?.accessToken}`,
    },
    cachePolicy: 'no-cache',
  }
  const url = process.env.NEXT_PUBLIC_API_URL;  
  return(
    <ReduxProvider store={store}>
      <Provider url={url} options={options}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </ReduxProvider>
  );
}

export default ApplicationCustom
