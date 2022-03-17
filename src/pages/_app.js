import App from 'next/app';
import React from 'react';
import { wrapper } from '@/stores';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@/styles/variables.less';

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  return process.browser ? (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  ) : (
    <PersistGate persistor={store}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
