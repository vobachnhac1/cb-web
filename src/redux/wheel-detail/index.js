// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listWheelDetail: []
  },
  {
    [TYPES.WHEELDETAIL_SEARCH]: (state = listWheelDetail, payload) => {

      return {
        ...state,
        listWheelDetail: payload //.sort(function (a, b) { return a.no - b.no })
      }
    }
  },
);
