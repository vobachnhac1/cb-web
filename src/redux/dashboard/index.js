// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';

// Creating my reducer
// export default function reducer(state = initMonitor, { type, payload }) {
//   switch (type) {
//     case TYPES.MONITOR_INIT:
//       return {
//         ...state,
//         wheel_id: payload
//       }
//     default:
//       return state;
//   }
// }

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
    }
  },
);

