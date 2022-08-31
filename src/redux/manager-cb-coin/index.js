// thực hiện logic

import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';


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
    }
  },
);
