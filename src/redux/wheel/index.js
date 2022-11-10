// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listWheel: [],
    pagination: {
      total_item: 0,
      num_page: 0,
      item_page: 20,
      current_page: 1,
    }
  },
  {
    [TYPES.WHEEL_SEARCH]: (state = listWheel, payload) => {

      return {
        ...state,
        listWheel: payload
      }
    },[TYPES.WHEEL_PAGE]: (state = pagination, payload) => {
      return {
        ...state,
        pagination: payload
      }
    },[TYPES.SIGN_OUT]: (state = init) => {
      return  {
        listWheel: [],
        pagination: {
          total_item: 0,
          num_page: 0,
          item_page: 20,
          current_page: 1,
        }
      }
    }
  },
);
