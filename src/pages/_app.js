import App from 'next/app';
import { wrapper } from '@/redux';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

require('@/styles/index.less');   // dùng require ko dùng import

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  return process.browser ? (
    <PersistGate persistor={store.__persistor}>
      <Component {...pageProps} />
    </PersistGate>
  ) : (
    <PersistGate persistor={store}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
