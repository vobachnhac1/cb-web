// thực hiện logic

import { ConsoleSqlOutlined } from '@ant-design/icons';
import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'
import { buildReducer } from '../wrapper';

// Creating my reducer
let initialState = {
    PathsFEList:[],
    PathsBEList:[],
    RolesList:[],
    AccountList:[],
    SystemList:[],
};

export default buildReducer(
  {
    PathsFEList:[],
    PathsBEList:[],
    RolesList:[],
    AccountList:[],
    SystemList:[],
  }, {
  [TYPES.SET_PATHS_BE]: (state = {...initialState}, payload) => {
    return {
      ...state,
      PathsBEList: payload
    }
  }, 
  [TYPES.SET_PATHS_FE]: (state =  {...initialState}, payload) => {
    return {
      ...state,
      PathsFEList: payload
    }
  }, [TYPES.SET_ACCOUNT]: (state =  {...initialState}, payload) => {
    return {
      ...state,
      AccountList: payload
    }
  },  [TYPES.SET_ROLES]: (state =  {...initialState}, payload) => {
    return {
      ...state,
      RolesList: payload
    }
  },  [TYPES.SET_SYSTEM]: (state =  {...initialState}, payload) => {
    return {
      ...state,
      SystemList: payload
    }
  },[TYPES.SIGN_OUT]: (state = init) => {
    return {}
  }
});