import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';
import { setToken } from '../wrapper';

// hàm thị thi nội bộ
const setEventWheel = (payload) => ({ type: TYPES.EVENT_WHEEL_SEARCH, payload });
const setEventInfo = (payload) => ({ type: TYPES.EVENT_INFO, payload });
const setCustomerInfo = (payload) => ({ type: TYPES.CUSTOMER_INFO, payload });
const setEventWheelProccessing = (payload) => ({ type: TYPES.EVENT_PROCCESSING, payload: payload });
// hàm xử lý được gọi từ bên ngoài

export const getContentWheel = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  // call xuống backend url + param 
  const param = {
    ...payload,
    wheel_id: payload.wheel_id,
    rules_id: null
  }
  const result = await $http.post(URLSERVER.searchWheelDetailByfilter, param);
  const { success, data } = result;
  if (!success || !data.success) {
    dispatch(setEventWheel({}))
    dispatch(setEventInfo({}))
    return false;
  }
  const body = data.data;
  dispatch(setEventWheel({ ...param, ...body }))
  dispatch(setEventInfo(payload))
  return true
}


export const getRewardOfWheel = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  dispatch(setEventWheelProccessing({ proccess: true, message: "" }));
  const { wheelreward } = getState();
  const { event_info = null } = wheelreward;
  // call xuống backend url + param 
  const param = {
    wheel_id: event_info.wheel_id,
    rules_id: null,
    user_id: event_info.usr_info.user_id,
    num: event_info.usr_info.num
  }
  const result = await $http.post(URLSERVER.getReward, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const body = data.data;
  dispatch(setCustomerInfo(body?.customerProfile))
  return body
}

export const SetCustomerInfo =  (payload) =>  (dispatch, getState, { $http }) => {
 dispatch(setCustomerInfo(payload))
}


export const setProcessing = (payload) => (dispatch, getState, { $http }) => {
  dispatch(setEventWheelProccessing({ proccess: payload, message: "" }));
}
// function export ra ngoài

const signOutDispatch = () => ({ type: TYPES.SIGN_OUT})

export const SignOut = () => async (dispatch, getState, { $http }) => {
  dispatch(signOutDispatch());
}