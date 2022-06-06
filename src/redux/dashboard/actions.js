import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';
import moment from 'moment';

// hàm thị thi nội bộ
const monitorInit = (payload) => ({
  type: TYPES.MONITOR_INIT,
  payload
});
const monitorDWM = (payload) => ({
  type: TYPES.MONITOR_DWM,
  payload
});
const monitorRewardRecieved = (payload) => ({
  type: TYPES.MONITOR_PERCENT_REWARD,
  payload
})

// hàm xử lý được gọi từ bên ngoài

export const getRewardWithDWM = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    wheel_id: payload.wheel_id ? payload.wheel_id : 42,
    filter_month: payload.month,
    filter_year: payload.year,
  }
  const result = await $http.post(URLSERVER.monitorGetRewardWithDWM, param);
  const { success, data } = result;
  if (!success || !data.success) {
    dispatch(monitorDWM([]));
    return false;
  }
  dispatch(monitorDWM(data.data));
  return true;
}
export const getRewardbyWheelId = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    wheel_id: payload.wheel_id ? payload.wheel_id : 42,
    init_percent: "7",
  }
  const result = await $http.post(URLSERVER.monitorGetRewardbyWheelId, param);
  const { success, data } = result;
  if (!success || !data.success) {
    dispatch(monitorInit([]));
    return false;
  }
  dispatch(monitorInit(data.data));
  return true
}
export const getRewardRecievedBytime = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    wheel_id: payload.wheel_id ? payload.wheel_id : 42,
    filter_month: payload.month,
    filter_year: payload.year,
    // format_time: "month",
    // num_time: "5",
  }
  const result = await $http.post(URLSERVER.monitorRewardRecievedBytime, param);
  const { success, data } = result;
  if (!success || !data.success) {
    dispatch(monitorRewardRecieved([]));
    return false;
  }
  dispatch(monitorRewardRecieved(data.data));
  return true
}
// function export ra ngoài

