// thực hiện logic

import { ConsoleSqlOutlined } from '@ant-design/icons';
import * as TYPES from './type';
export * as getters from './getter'
export * as actions from './actions'

let initialState = {
  server: '',
  client: '',
  counter: 0,
  access_token: ''
};

// Creating my reducer
export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case TYPES.LOGIN_ADMIN:
      return {
        ...state,
        access_token: payload
      }
    default:
      return state;
  }
}
