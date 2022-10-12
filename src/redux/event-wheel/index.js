// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';

const init = {
  body: {
    wheel_id: null,
    rules_id: null,
    listContentReward: [],
  },
  process: {
    status: false,
    message: null
  },
  event_info: null
}
//Creating my reducer
export default buildReducer(
  {
    body: {
      wheel_id: null,
      rules_id: null,
      listContentReward: [],
    },
    process: {
      status: false,
      message: null
    },
    event_info: null
  },
  {
    [TYPES.EVENT_WHEEL_SEARCH]: (state, payload) => {
      return {
        ...state,
        body: {
          wheel_id: payload.wheel_id,
          rules_id: payload.rules_id,
          listContentReward: payload.list_wheel_dt,
        }
      }
    }, [TYPES.EVENT_PROCCESSING]: (state, payload) => {
      return {
        ...state,
        process: {
          status: payload.proccess,
          message: payload.message
        }
      }
    }, [TYPES.EVENT_INFO]: (state, payload) => {
      return {
        ...state,
        event_info: payload
      }
    },[TYPES.SIGN_OUT]: (state = init) => {
      return {}
    }
  },
);
