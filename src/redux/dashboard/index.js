// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';

const init = {
  listInit: [],
  listDWM: [],
  listRewardRecieved: [],
}

//Creating my reducer
export default buildReducer(
  {
    listInit: [],
    listDWM: [],
    listRewardRecieved: [],
  },
  {
    [TYPES.MONITOR_INIT]: (state = listInit, payload) => {
      return {
        ...state,
        listInit: payload
      }
    },
    [TYPES.MONITOR_DWM]: (state = listDWM, payload) => {
      return {
        ...state,
        listDWM: payload
      }
    },
    [TYPES.MONITOR_PERCENT_REWARD]: (state = listRewardRecieved, payload) => {
      return {
        ...state,
        listRewardRecieved: payload
      }
    },[TYPES.SIGN_OUT]: (state = init) => {
      return {}
    }
  },
);

