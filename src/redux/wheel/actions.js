import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const setSearchWheel = (payload) => ({ type: TYPES.WHEEL_SEARCH, payload });
// hàm xử lý được gọi từ bên ngoài


// const paramsInit = {
//   "wheel_id": 0,
//   "num_segments": 0,
//   "wheel_name": "string",
//   "account_nbr": "string",
//   "total_value": 0,
//   "remain_value": 0,
//   "outer_radius": 0,
//   "text_fontsize": 0,
//   "rotation_angle": 0,
//   "inactived_date": "2022-04-09T07:38:05.782Z",
//   "created_date": "2022-04-09T07:38:05.782Z",
//   "datelastmaint": "2022-04-09T07:38:05.782Z",
//   "is_approve": true
// }
export const searchWheel = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": payload.wheel_id ? payload.wheel_id : 0,
    "num_segments": payload.num_segments ? payload.num_segments : 0,
    "wheel_name": payload.wheel_name ? payload.wheel_name : "string",
    "account_nbr": payload.account_nbr ? payload.account_nbr : "string",
    "total_value": payload.total_value ? payload.total_value : 0,
    "remain_value": payload.remain_value ? payload.remain_value : 0,
    "outer_radius": payload.outer_radius ? payload.outer_radius : 0,
    "text_fontsize": payload.text_fontsize ? payload.text_fontsize : 0,
    "rotation_angle": payload.rotation_angle ? payload.rotation_angle : 0,
    "inactived_date": payload.inactived_date ? payload.inactived_date : "2022-04-09T07:38:05.782Z",
    "created_date": payload.created_date ? payload.created_date : "2022-04-09T07:38:05.782Z",
    "datelastmaint": payload.datelastmaint ? payload.datelastmaint : "2022-04-09T07:38:05.782Z",
    "is_approve": payload.is_approve ? payload.is_approve : true
  }
  // call xuống backend url + param 
  const result = await $http.post(URLSERVER.searchAllWheel, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listWheel = data.data;
  dispatch(setSearchWheel(listWheel))
  return true
}

export const insertWheel = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": parseInt(payload.wheel_id),
    "num_segments": parseInt(payload.num_segments),
    "wheel_name": payload.wheel_name,
    "account_nbr": payload.account_nbr,
    "total_value": parseInt(payload.total_value),
    "remain_value": parseInt(payload.remain_value),
    "outer_radius": parseInt(payload.outer_radius),
    "text_fontsize": parseInt(payload.text_fontsize),
    "rotation_angle": parseInt(payload.rotation_angle),
    "inactived_date": payload.inactived_date,
    "created_date": "2022-04-09T08:41:40.514Z",
    "datelastmaint": "2022-04-09T08:41:40.514Z",
    "is_approve": true
  }
  // console.log('call action', param)
  // call xuống backend url + param 
  const result = await $http.post(URLSERVER.insertWheel, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const updateWheel = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": parseInt(payload.wheel_id),
    "num_segments": parseInt(payload.num_segments),
    "wheel_name": payload.wheel_name,
    "account_nbr": payload.account_nbr,
    "total_value": parseInt(payload.total_value),
    "remain_value": parseInt(payload.remain_value),
    "outer_radius": parseInt(payload.outer_radius),
    "text_fontsize": parseInt(payload.text_fontsize),
    "rotation_angle": parseInt(payload.rotation_angle),
    "inactived_date": payload.inactived_date,
    "created_date": "2022-04-09T08:41:40.514Z",
    "datelastmaint": "2022-04-09T08:41:40.514Z",
    "is_approve": true
  }
  // call xuống backend url + param 
  const result = await $http.post(URLSERVER.updateWheelById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const deleteWheelById = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": parseInt(payload.wheel_id),
    "num_segments": parseInt(payload.num_segments),
    "wheel_name": payload.wheel_name,
    "account_nbr": payload.account_nbr,
    "total_value": parseInt(payload.total_value),
    "remain_value": parseInt(payload.remain_value),
    "outer_radius": parseInt(payload.outer_radius),
    "text_fontsize": parseInt(payload.text_fontsize),
    "rotation_angle": parseInt(payload.rotation_angle),
    "inactived_date": payload.inactived_date,
    "created_date": "2022-04-09T08:41:40.514Z",
    "datelastmaint": "2022-04-09T08:41:40.514Z",
    "is_approve": true
  }
  // call xuống backend url + param 
  const result = await $http.post(URLSERVER.deleteWheelById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const filterWheel = (payload) => async (dispatch, getState, { $http }) => {
  const result = await $http.post(URLSERVER.searchWheelById, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listWheel = data.data;
  dispatch(setSearchWheel(listWheel))
  return true
}


// function export ra ngoài

