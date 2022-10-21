// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listWheel: []
  },
  {
    [TYPES.WHEEL_SEARCH]: (state = listWheel, payload) => {

      return {
        ...state,
        listWheel: payload
      }
    },[TYPES.SIGN_OUT]: (state = init) => {
      return  {
        listWheel: []
      }
    }
  },
);
