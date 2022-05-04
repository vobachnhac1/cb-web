// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listWheelDetail: [],
    wheelCurtValue: 0,
    wheelTotalValue: 0,
    wheelDetialTotalValue: 0,
    no: 0,
    num_segment_wheel: 0,
    wheel_status:''
  },
  {
    [TYPES.WHEELDETAIL_SEARCH]: (state, payload) => {
      console.log(' redux state WheelDetail', state)
      console.log(' redux payload WheelDetail', payload)

      return {
        ...state,
        listWheelDetail: payload.listData,
        wheelCurtValue: payload.wheel_curt_value,
        wheelTotalValue: payload.wheel_total_value,
        wheelDetialTotalValue: payload.Wheel_detail_total_value,
        no: payload.no
      }
    },
    [TYPES.WHEELDETAIL_DATACHECKWHEEL]: (state, payload) => {
      return {
        ...state,
        num_segment_wheel: payload.num_segment_wheel,
        wheel_status: payload.wheel_status

      }
    },
  },
);
