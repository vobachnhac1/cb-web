// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listRules: [],
  }, {
  [TYPES.RULES_SEARCH]: (state = listRules, payload) => {
    return {
      ...state,
      listRules: payload
    }
  },
});
