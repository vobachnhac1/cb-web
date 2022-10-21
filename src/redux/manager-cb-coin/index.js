// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';

const init = {
  listManagerCbCoin: [],
  listManagerCbCoinUserHistory: [],
  listManagerCbCoinHistory: []
}
//Creating my reducer
export default buildReducer(
  {
    listManagerCbCoin: []
  },
  {
    [TYPES.MANAGER_CB_COIN_SEARCH]: (state = listManagerCbCoin, payload) => {
      return {
        ...state,
        listManagerCbCoin: payload
      }
    }, [TYPES.SIGN_OUT]: (state = init) => {
      return {}
    },
    [TYPES.MANAGER_CB_COIN_USERHISTORY]: (state = listManagerCbCoinUserHistory, payload) => {
      return {
        ...state,
        listManagerCbCoinUserHistory: payload
      }
    },
    [TYPES.MANAGER_CB_COIN_HISTORY]: (state = listManagerCbCoinHistory, payload) => {
      return {
        ...state,
        listManagerCbCoinHistory: payload
      }
    }
  },
);
