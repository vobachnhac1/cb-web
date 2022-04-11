import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const searchWheelDispath = (payload) => ({ type: TYPES.WHEEL_SEARCH, payload });
// hàm xử lý được gọi từ bên ngoài
export const searchWheel = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": payload.wheel_id,
    "num_segments": payload.num_segments,
    "wheel_name": payload.wheel_name,
    "account_nbr": payload.account_nbr,
    "total_value": payload.total_value,
    "remain_value": payload.remain_value,
    "outer_radius": payload.outer_radius,
    "text_fontsize": payload.text_fontsize,
    "rotation_angle": payload.rotation_angle,
    "inactived_date": payload.inactived_date,
    "created_date": payload.created_date,
    "datelastmaint": payload.datelastmaint,
    "is_approve": true
  }
  // call xuống backend url + param 
  const result = await $http.post(URLSERVER.searchAllWheel, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listWheel = data.data;
  dispatch(searchWheelDispath(listWheel))
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
  console.log('call action create insert Wheel', result)
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
  console.log('call action edit wheel', param)
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


// function export ra ngoài

