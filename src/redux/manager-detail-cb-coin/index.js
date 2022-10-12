// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';

const init = {
  listManagerDetailCbCoin: []
}
//Creating my reducer
export default buildReducer(
  {
    listManagerDetailCbCoin: []
  }, 
  {
    [TYPES.MANAGER_DETAIL_CB_COIN_SEARCH]: (state = listManagerDetailCbCoin, payload) => {

      return {
        ...state,
        listManagerDetailCbCoin: payload
      }
    },[TYPES.SIGN_OUT]: (state = init) => {
      return {}
    }
  },
);
