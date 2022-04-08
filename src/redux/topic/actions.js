import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const setSearchTopic = (payload) => ({ type: TYPES.TOPIC_SEARCH, payload });

// hàm xử lý được gọi từ bên ngoài
export const searchTopic = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": null,
    "topic_name": "string",
    "inactived_date": null,
    "created_date": null,
    "datelastmaint": null,
    "is_approve": null
  }
  // call xuống backend url + param 

  const result = await $http.post(URLSERVER.searchAllTopic, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listTopic = data.data;
  dispatch(setSearchTopic(listTopic))
  return true
}

export const insertTopic = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": null,
    "topic_name": payload.topic_name,
    "inactived_date": null,
    "created_date": null,
    "datelastmaint": null,
    "is_approve": null
  }
  const result = await $http.post(URLSERVER.insertTopic, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true;
}

export const updateTopic = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": payload.topic_id,
    "topic_name": payload.topic_name,
    "inactived_date": null,
    "created_date": null,
    "datelastmaint": null,
    "is_approve": payload.status_yn
  }
  const result = await $http.post(URLSERVER.updateTopicById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true;
}

export const deleteTopic = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": payload.topic_id,
    "topic_name": null,
    "inactived_date": null,
    "created_date": null,
    "datelastmaint": null,
    "is_approve": null
  }
  const result = await $http.post(URLSERVER.deleteTopicById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true;
}
export const approveTopic = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": payload.topic_id,
    "topic_name": null,
    "inactived_date": null,
    "created_date": null,
    "datelastmaint": null,
    "is_approve": null
  }
  const result = await $http.post(URLSERVER.approveTopicById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true;
}


// function export ra ngoài

