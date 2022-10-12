import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

const setSearchSegment = (payload) => ({ type: TYPES.SEGMENT_SEARCH, payload });

export const searchSegment = (payload) => async (dispatch, getState, { $http }) => {
  // call xuống backend url + param 
  const result = await $http.get(URLSERVER.searchAllSegment);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listSegment = data.data; 0
  dispatch(setSearchSegment(listSegment))
  return true
}

export const insertSegment = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": payload.topic_id,
    "segment_id": payload.segment_id,
    "segment_name": payload.segment_name,
    // "segment_color": payload.segment_color,
    "segment_value": payload.segment_value,
    "inactived_date": payload.inactived_date,
    "created_date": "2022-04-08T09:54:19.063Z",
    "datelastmaint": "2022-04-08T09:54:19.063Z",
    "is_approve": payload.is_approve
  }

  const result = await $http.post(URLSERVER.insertSegment, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const updateSegment = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": payload.topic_id,
    "segment_id": payload.segment_id,
    "segment_name": payload.segment_name,
    // "segment_color": payload.segment_color,
    "segment_value": payload.segment_value,
    "inactived_date": payload.inactived_date,
    "created_date": "2022-04-08T09:54:19.063Z",
    "datelastmaint": "2022-04-08T09:54:19.063Z",
    "is_approve": payload.is_approve
  }
  // call xuống backend url + param
  const result = await $http.put(URLSERVER.updateSegmentById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const deleteSegmentById = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "segment_id": parseInt(payload.segment_id),
  }
  // call xuống backend url + param
  const result = await $http.delete(URLSERVER.deleteSegmentById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const filterSegment = (payload) => async (dispatch, getState, { $http }) => {
  const result = await $http.post(URLSERVER.searchSegmentById, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listSegment = data.data;
  dispatch(setSearchSegment(listSegment))

  return {
    "success": true,
  }
}

export const filterSegmentByIdTopic = (payload) => async (dispatch, getState, { $http }) => {
  const result = await $http.post(URLSERVER.searchSegmentById, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listSegment = data.data;
  let segment_id;

  if (listSegment !== []) {
    for (let i = 0; i < listSegment.length; i++) {
      segment_id = listSegment[i].segment_id
      break
    }
  }
  return {
    "success": true,
    "data": {
      "segment_id": segment_id,
      "listSegmentSearch": listSegment
    }
  }
}

// function export ra ngoài

const signOutDispatch = () => ({ type: TYPES.SIGN_OUT})

export const SignOut = () => async (dispatch, getState, { $http }) => {
  dispatch(signOutDispatch());
}