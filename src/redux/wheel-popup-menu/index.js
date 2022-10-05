// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listReward: [],
    listWheelDetailById: [],
    listCustomer: [],
  },
  {
    [TYPES.WHEELPOPUPMENU_REWARD_SEARCH]: (state, payload) => {
      return {
        ...state,
        listReward: payload.listReward,
      }
    },
    [TYPES.WHEELPOPUPMENU_WHEELDETAILBYID_SEARCH]: (state, payload) => {
      return {
        ...state,
        listWheelDetailById: payload.listWheelDetailById,
      }
    },
    [TYPES.WHEELPOPUPMENU_CUSTOMER_SEARCH]: (state, payload) => {
      return {
        ...state,
        listCustomer: payload.listCustomer,
      }
    },

  },
);
