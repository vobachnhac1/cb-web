// thực hiện logic

import { ConsoleSqlOutlined } from '@ant-design/icons';
import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';

// Creating my reducer
let initialState = {
  server: '',
  client: '',
  counter: 0,
  userProfile:{},
  arrPaths: [],
  access_token: ''
};
export default buildReducer(
  {
    server: '',
    client: '',
    counter: 0,
    userProfile:{},
    arrPaths: [],
    access_token: ''
  }, {
  [TYPES.SIGN_IN]: (state = {...initialState}, payload) => {
    return {
      ...state,
      access_token: payload.accessToken,
      arrPaths: payload.arrPaths,
      userProfile: payload.userProfile,
    }
  }, 
  [TYPES.SIGN_OUT]: (state =  {...initialState}) => {
    return {}
    return {}
  }, 
});