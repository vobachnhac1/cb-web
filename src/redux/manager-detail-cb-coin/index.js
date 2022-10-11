// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


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
    }
  },
);
