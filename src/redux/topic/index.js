// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listTopic: []
  }, {
  [TYPES.TOPIC_SEARCH]: (state = listTopic, payload) => {
    return {
      ...state,
      listTopic: payload
    }
  },
});
