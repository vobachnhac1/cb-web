// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listSegment: [],
    listSegmentCommon: [],
    pagination: {
      total_item: 0,
      num_page: 0,
      item_page: 20,
      current_page: 1,
    }
  }, 
  {
    [TYPES.SEGMENT_SEARCH]: (state = listSegment, payload) => {
      return {
        ...state,
        listSegment: payload
      }
    },[TYPES.SEGMENT_SEARCH_COMMON]: (state = listSegmentCommon, payload) => {
      return {
        ...state,
        listSegmentCommon: payload
      }
    },[TYPES.SEGMENT_PAGE]: (state = pagination, payload) => {
      return {
        ...state,
        pagination: payload
      }
    },[TYPES.SIGN_OUT]: (state = init) => {
      return {
        listSegment: [],
        listSegmentCommon: [],
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
