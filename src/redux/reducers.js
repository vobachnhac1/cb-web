import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "./sync_storage";
import globalReducer from "@/redux/global";
import systemReducer from "@/redux/system";
import topicReducer from "@/redux/topic";
import wheelReducer from "@/redux/wheel";
import segmentReducer from "@/redux/segment";
import wheelDetailReducer from "@/redux/wheel-detail";
import WheelRewardReducer from "@/redux/event-wheel";
import RulesReducer from "@/redux/rules";
import DashboardReducer from "@/redux/dashboard";
import ManagerCbCoinReducer from "@/redux/manager-cb-coin";
import ManagerDetailCbCoinReducer from "@/redux/manager-detail-cb-coin";
import wheelPopupMenuReducer from "@/redux/wheel-popup-menu";

const genPersistConfig = (key, properties) => ({
  key,
  storage: storage,
  ...properties,
});

//COMBINING ALL REDUCERS
const rootReducer = combineReducers({
  global: persistReducer(genPersistConfig("global"), globalReducer),
  system: persistReducer(genPersistConfig("system"), systemReducer),
  topic: persistReducer(genPersistConfig("topic"), topicReducer),
  wheel: persistReducer(genPersistConfig("wheel"), wheelReducer),
  segment: persistReducer(genPersistConfig("segment"), segmentReducer),
  wheeldetail: persistReducer(genPersistConfig("wheeldetail"), wheelDetailReducer),
  wheelreward: persistReducer(genPersistConfig("wheelreward"), WheelRewardReducer),
  rules: persistReducer(genPersistConfig("rules"), RulesReducer),
  dashboard: persistReducer(genPersistConfig("dashboard"), DashboardReducer),
  ManagerCbCoin: persistReducer(genPersistConfig("ManagerCbCoin"), ManagerCbCoinReducer),
  ManagerDetailCbCoin: persistReducer(genPersistConfig("ManagerDetailCbCoin"), ManagerDetailCbCoinReducer),
  wheelPopupMenu: persistReducer(genPersistConfig("wheelPopupMenu"), wheelPopupMenuReducer),
});
export default rootReducer;
