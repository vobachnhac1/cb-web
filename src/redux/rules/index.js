// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listRules: [],
    listWheelApproved: []
  }, {
  [TYPES.RULES_SEARCH]: (state = listRules, payload) => {
    return {
      ...state,
      listRules: payload
    }
  }, [TYPES.RULES_WHEEL_APPROVED]: (state, payload) => {
    return {
      ...state,
      listWheelApproved: payload
    }
  },
});
