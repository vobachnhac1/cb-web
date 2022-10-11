import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "./sync_storage";
import globalReducer from "@/redux/global";
import topicReducer from "@/redux/topic";
import wheelReducer from "@/redux/wheel";
import segmentReducer from "@/redux/segment";
import wheelDetailReducer from "@/redux/wheel-detail";
import WheelRewardReducer from "@/redux/event-wheel";
import RulesReducer from "@/redux/rules";
import DashboardReducer from "@/redux/dashboard";
import ManagerCbCoinReducer from "@/redux/manager-cb-coin";
import ManagerDetailCbCoinReducer from "@/redux/manager-detail-cb-coin";

const genPersistConfig = (key, properties) => ({
  key,
  storage: storage,
  ...properties,
});

//COMBINING ALL REDUCERS
const rootReducer = combineReducers({
  global: persistReducer(genPersistConfig("global"), globalReducer),
  topic: persistReducer(genPersistConfig("topic"), topicReducer),
  wheel: persistReducer(genPersistConfig("wheel"), wheelReducer),
  segment: persistReducer(genPersistConfig("segment"), segmentReducer),
  wheeldetail: persistReducer(genPersistConfig("wheeldetail"), wheelDetailReducer),
  wheelreward: persistReducer(genPersistConfig("wheelreward"), WheelRewardReducer),
  rules: persistReducer(genPersistConfig("rules"), RulesReducer),
  dashboard: persistReducer(genPersistConfig("dashboard"), DashboardReducer),
  ManagerCbCoin: persistReducer(genPersistConfig("rules"), ManagerCbCoinReducer),
  ManagerDetailCbCoin: persistReducer(genPersistConfig("rules"), ManagerDetailCbCoinReducer)

});
export default rootReducer;
