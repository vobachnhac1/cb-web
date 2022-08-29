// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    // listSegment: []
  }, 
  {
    // [TYPES.SEGMENT_SEARCH]: (state = listSegment, payload) => {

    //   return {
    //     ...state,
    //     listSegment: payload
    //   }
    // }
  },
);
