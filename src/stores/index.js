import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './reducers'
import thunk from 'redux-thunk';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage
  }
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const initialState = {};

  // tạo 1 store sử dụng middleware
  const configureStore = () =>{
    const store = createStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== 'development',
      middleware: [thunk.withExtraArgument({ $http: RestClient })]
    });
    return store;
  }

  
  export default () => {
    let store = configureStore();
    let persistor = persistStore(store)
    return { store, persistor }
  }