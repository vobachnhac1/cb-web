import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const setEventWheel = (payload) => ({ type: TYPES.EVENT_WHEEL_SEARCH, payload });
const setEventWheelProccessing = (proccess, message) => ({ type: TYPES.EVENT_PROCCESSING, payload: { proccess, message } });
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
  return true
}


export const getRewardOfWheel = (payload) => async (dispatch, getState, { $http }) => {
  dispatch(setEventWheelProccessing(true, ""));
  // call xuống backend url + param 
  const param = {
    wheel_id: 12,
    wheel_detail_id: 0,
    rules_id: 1
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
  dispatch(setEventWheelProccessing(payload, ""));
}
// function export ra ngoài

