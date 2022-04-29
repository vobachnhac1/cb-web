import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const setEventWheel = (payload) => ({ type: TYPES.EVENT_WHEEL_SEARCH, payload });
const setEventInfo = (payload) => ({ type: TYPES.EVENT_INFO, payload });
const setEventWheelProccessing = (payload) => ({ type: TYPES.EVENT_PROCCESSING, payload: payload });
// hàm xử lý được gọi từ bên ngoài

export const getContentWheel = (payload) => async (dispatch, getState, { $http }) => {
  // call xuống backend url + param 
  const param = {
    ...payload,
    wheel_id: payload.wheel_id,
    rules_id: null
  }
  const result = await $http.post(URLSERVER.searchWheelDetailByfilter, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const body = data.data;
  dispatch(setEventWheel({ ...param, ...body }))
  dispatch(setEventInfo(payload))
  return true
}


export const getRewardOfWheel = (payload) => async (dispatch, getState, { $http }) => {
  dispatch(setEventWheelProccessing({ proccess: true, message: "" }));
  const { wheelreward } = getState();
  const { event_info = null } = wheelreward;
  // call xuống backend url + param 
  const param = {
    wheel_id: 12,
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
  return body
}

export const setProcessing = (payload) => async (dispatch, getState, { $http }) => {
  dispatch(setEventWheelProccessing({ proccess: payload, message: "" }));
}
// function export ra ngoài

