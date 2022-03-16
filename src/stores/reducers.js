import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import globalReducer from '../stores/global'

const genPersistConfig = (key, props) => ({
    key,
    storage: storage,
    ...props,
  });

  // nơi đăng ký 1 page là 1 store
const rootReducer = combineReducers({ 
    global: persistReducer(genPersistConfig('global'), globalReducer),

});
export default persistReducer(genPersistConfig('root'), rootReducer);
