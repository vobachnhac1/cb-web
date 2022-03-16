import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { persistStore, persistReducer } from 'redux-persist';
import { RestClient } from '../core/rest-client';

import thunkMiddleware from 'redux-thunk';
import storage from './sync_storage';
import reducers from './reducers';
// If you don't bother about the error redux-persist failed to create sync storage. falling back to noop storage...uncomment the next line and comment out the previous import. See more on - https://github.com/vercel/next.js/discussions/15687
// const storage = require('redux-persist/lib/storage').default;

// BINDING MIDDLEWARE
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};
// thunk.withExtraArgument({ $http: RestClient })

const makeStore = ({ isServer }) => {
  if (isServer) {
    //If it's on server side, create a store
    return createStore(reducers, bindMiddleware([thunkMiddleware.withExtraArgument({$http: RestClient })]));
  } else {
    //If it's on client side, create a store which will persist
    // const { persistStore, persistReducer } = require('redux-persist');

    const persistConfig = {
      key: 'nextjs',
      // whitelist: ['global'], // only counter will be persisted, add other reducers if needed
      storage, // if needed, use a safer storage
    };

    const persistedReducer = persistReducer(persistConfig, reducers); // Create a new reducer with our existing reducer

    const store = createStore(
      persistedReducer,
      bindMiddleware([thunkMiddleware.withExtraArgument({$http: RestClient })])
    ); // Creating the store again

    store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
    return store;
  }
};

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export const wrapper = createWrapper(makeStore);
