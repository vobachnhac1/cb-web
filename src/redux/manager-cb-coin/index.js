// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';

const init = {
  listManagerCbCoin: []
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
    },[TYPES.SIGN_OUT]: (state = init) => {
      return {}
    }
  },
);
