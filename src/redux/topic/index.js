// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listTopic: [],
    listTopicCommon: [],
    pagination: {
      total_item: 0,
      num_page: 0,
      item_page: 20,
      current_page: 1,
    }
  }, {
  [TYPES.TOPIC_SEARCH]: (state = listTopic, payload) => {
    return {
      ...state,
      listTopic: payload
    }
  },[TYPES.TOPIC_SEARCH_COMMON]: (state = listTopicCommon, payload) => {
    return {
      ...state,
      listTopicCommon: payload
    }
  }, [TYPES.TOPIC_PAGE]: (state = pagination, payload) => {
    return {
      ...state,
      pagination: payload
    }
  },[TYPES.SIGN_OUT]: (state = init) => {
    return {
      listTopic: [],
      listTopicCommon: [],
      pagination: {
        total_item: 0,
        num_page: 0,
        item_page: 20,
        current_page: 1,
      }
    }
  }
});
