import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const searchWheelDetailDispath = (payload) => ({ type: TYPES.WHEELDETAIL_SEARCH, payload });
// hàm xử lý được gọi từ bên ngoài
export const searchWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": 0,
    "wheel_detail_id": 0,
    "segment_id": 0,
    "no": 0,
    "goal_yn": 0,
    "remain_value": 0,
    "inactived_date": "2022-04-11T06:06:50.653Z",
    "created_date": "2022-04-11T06:06:50.653Z",
    "datelastmaint": "2022-04-11T06:06:50.653Z",
    "is_approve": true
  }
  // call xuống backend url + param 
  const result = await $http.post(URLSERVER.searchAllWheelDetail, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listWheelDetail = data.data; 0
  dispatch(searchWheelDetailDispath(listWheelDetail))
  return true
}

export const insertWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": payload.wheel_id,
    "wheel_detail_id": payload.wheel_detail_id,
    "segment_id": payload.segment_id,
    "no": payload.no,
    "goal_yn": payload.goal_yn,
    "remain_value": payload.remain_value,
    "inactived_date": "2022-04-11T07:39:21.202Z",
    "created_date": "2022-04-11T07:39:21.202Z",
    "datelastmaint": "2022-04-11T07:39:21.202Z",
    "is_approve": true
  }
  // call xuống backend url + param 
  const result = await $http.post(URLSERVER.insertWheelDetail, param);
  console.log('call action create insert WheelDetail', result)
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const updateWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": payload.topic_id,
    "wheeldetail_id": payload.wheeldetail_id,
    "wheeldetail_name": payload.wheeldetail_name,
    "wheeldetail_color": payload.wheeldetail_color,
    "inactived_date": payload.inactived_date,
    "created_date": "2022-04-08T09:54:19.063Z",
    "datelastmaint": "2022-04-08T09:54:19.063Z",
    "is_approve": payload.is_approve
  }
  // call xuống backend url + param 
  const result = await $http.post(URLSERVER.updateWheelDetailById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const deleteWheelDetailById = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": payload.topic_id,
    "wheeldetail_id": payload.wheeldetail_id,
    "wheeldetail_name": payload.wheeldetail_name,
    "wheeldetail_color": payload.wheeldetail_color,
    "inactived_date": payload.inactived_date,
    "created_date": payload.created_date,
    "datelastmaint": payload.datelastmaint,
    "is_approve": payload.is_approve
  }
  // call xuống backend url + param 
  const result = await $http.post(URLSERVER.deleteWheelDetailById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}


// function export ra ngoài

