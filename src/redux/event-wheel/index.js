// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';

const init = {
  body: {
    wheel_id: null,
    rules_id: null,
    wheel_status: null,
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
      wheel_status: null,
      listContentReward: [],
    },
    process: {
      status: false,
      message: null
    },
    event_info: null,
    customerProfile:{
      customerId: null,
      customerName: null,
      nationalId: null,
      totalPoint: 0,
      numTimes: 0,
    }
  },
  {
    [TYPES.EVENT_WHEEL_SEARCH]: (state, payload) => {
      const _profile = payload['customerProfile']
      return {
        ...state,
        customerProfile: _profile,
        body: {
          wheel_id: payload?.wheel_id,
          wheel_status: payload?.wheel_status,
          rules_id: payload?.rules_id,
          listContentReward: payload?.list_wheel_dt,
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
    }, [TYPES.CUSTOMER_INFO]: (state, payload) => {
      return {
        ...state,
        customerProfile: payload
      }
    },[TYPES.SIGN_OUT]: (state = init) => {
      return   {
        body: {
          wheel_id: null,
          rules_id: null,
          wheel_status: null,
          listContentReward: [],
        },
        process: {
          status: false,
          message: null
        },
        event_info: null,
        customerProfile:{
          customerId: null,
          customerName: null,
          nationalId: null,
          totalPoint: 0,
          numTimes: 0,
        }
      }
    }
  },
);
