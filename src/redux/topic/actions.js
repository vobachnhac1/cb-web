import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';
import { setToken } from '../wrapper';

// hàm thị thi nội bộ
const setSearchTopic = (payload) => ({ type: TYPES.TOPIC_SEARCH, payload });
const setTopicCommon = (payload) => ({ type: TYPES.TOPIC_SEARCH_COMMON, payload });
const setPagination = (payload) => ({ type: TYPES.TOPIC_PAGE, payload });

// hàm xử lý được gọi từ bên ngoài
export const searchTopic = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  // call xuống backend url + param 
  const result = await $http.get(URLSERVER.searchAllTopic);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listTopic = data.data;
  dispatch(setTopicCommon(listTopic))
  return true
}

export const insertTopic = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const param = {
    "topic_name": payload.topic_name,
    "systemCode": payload.systemCode,
  }
  const result = await $http.post(URLSERVER.insertTopic, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true;
}

export const updateTopic = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const param = {
    "topic_id": payload.topic_id,
    "topic_name": payload.topic_name,
    "systemCode": payload.systemCode
  }
  const result = await $http.put(URLSERVER.updateTopicById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true;
}

export const deleteTopic = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const param = {
    "topic_id": payload.topic_id,
  }
  const result = await $http.delete(URLSERVER.deleteTopicById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true;
}

export const filterTopic = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const _state = getState()
  const result = await $http.post(URLSERVER.searchTopicById, {...payload});
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const list = data.data?.list_topic;
  const pagination = data.data?.pagination;
  dispatch(setSearchTopic(list))
  dispatch(setPagination(pagination))
  return true
}
// function export ra ngoài


const signOutDispatch = () => ({ type: TYPES.SIGN_OUT})

export const SignOut = () => async (dispatch, getState, { $http }) => {
  dispatch(signOutDispatch());
}