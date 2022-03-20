import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "./sync_storage";
import globalReducer from "@/stores/global";

// import { HYDRATE } from 'next-redux-wrapper';

// import auth, { initialState as authInitial } from './auth';
// import loader, { initialState as initialLoader } from './loader';

// export const initialState = {
// 	auth: authInitial,
// 	loader: initialLoader,
// };

// lấy dữ liệu trong store
const genPersistConfig = (key, properties) => ({
  key,
  storage: storage,
  ...properties,
});

//COMBINING ALL REDUCERS
const rootReducer = combineReducers({
  global: persistReducer(genPersistConfig("global"), globalReducer),
});


export default rootReducer;
