import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from './sync_storage';
import globalReducer from '@/stores/global';

const genPersistConfig = (key, properties) => ({
  key,
  storage: storage,
  ...properties
});

//COMBINING ALL REDUCERS
const rootReducer = combineReducers({
  global: persistReducer(genPersistConfig('global'), globalReducer)
});
export default rootReducer;
