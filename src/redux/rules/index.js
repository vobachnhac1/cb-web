// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


//Creating my reducer
export default buildReducer(
  {
    listRules: [],
    listRulesModal: [],
    listRulesStateYes: [],
    listWheelApproved: [],
    listWheelRule: [],
    listWheelStart: [],
    listWheelDetail: [],
    listWheel: [],
    listRewardHis: [],
    pagination: {
      total_item: 0,
      num_page: 0,
      item_page: 20,
      current_page: 1,
    }
  }, {
    [TYPES.RULES_PAGE ]: (state = pagination, payload) => {
      return {
        ...state,
        pagination: payload
      }
    },
  [TYPES.RULES_SEARCH]: (state = listRules, payload) => {
    return { 
      ...state,
      listRules: payload
    }
  }, [TYPES.RULES_SEARCH_MODAL]: (state = listRulesModal, payload) => {
    return {
      ...state,
      listRulesModal: payload
    }
  }, [TYPES.RULES_WHEEL_START]: (state, payload) => {
    return {
      ...state,
      listWheelStart: payload
    }
  }, [TYPES.RULES_WHEEL_APR]: (state, payload) => {
    return {
      ...state,
      listWheelApproved: payload
    }
  },[TYPES.RULES_WHEEL_RULE]: (state, payload) => {
    return {
      ...state,
      listWheelRule: payload
    }
  }, [TYPES.RULES_WHEEL_DETAIL]: (state, payload) => {
    return {
      ...state,
      listWheelDetail: payload
    }
  }, [TYPES.RULES_WHEEL]: (state, payload) => {
    return {
      ...state,
      listWheel: payload
    }
  }, [TYPES.RULES_STATE_YES]: (state, payload) => {
    return {
      ...state,
      listRulesStateYes: payload
    }
  }, [TYPES.RULES_REWARD_HIS]: (state, payload) => {
    return {
      ...state,
      listRewardHis: payload
    }
  },[TYPES.SIGN_OUT]: (state = init) => {
    return {
      listRules: [],
      listRulesModal: [],
      listRulesStateYes: [],
      listWheelApproved: [],
      listWheelRule: [],
      listWheelStart: [],
      listWheelDetail: [],
      listWheel: [],
      listRewardHis: [],
      pagination: {
        total_item: 0,
        num_page: 0,
        item_page: 20,
        current_page: 1,
      }
    }
  }
});
