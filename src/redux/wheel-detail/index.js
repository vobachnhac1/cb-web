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
    no: 0
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
    // [TYPES.WHEELDETAIL_NO]: (state, payload) => {
    //   console.log('state WHEELDETAIL_NO', state)
    //   console.log('payload WHEELDETAIL_NO', payload)
    //   return {
    //     ...state,
    //     no: payload.no
    //   }
    // },
    // [TYPES.WHEELDETAIL_WHEELTOTALVALUE]: (state, payload) => {

    //   return {
    //     ...state,
    //     listWheelDetail: payload //.sort(function (a, b) { return a.no - b.no })
    //   }
    // },
    // [TYPES.WHEELDETAIL_WHEELDETAILTOTALVALUE]: (state, payload) => {
    //   // = listWheelDetail
    //   return {
    //     ...state,
    //     listWheelDetail: payload //.sort(function (a, b) { return a.no - b.no })
    //   }
    // }
  },
);
