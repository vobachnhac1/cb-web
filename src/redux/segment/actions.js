import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

const setSearchSegment = (payload) => ({ type: TYPES.SEGMENT_SEARCH, payload });

export const searchSegment = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": payload.topic_id,
    "segment_id": payload.segment_id,
    "segment_name": payload.segment_name,
    "segment_color": payload.segment_color,
    "inactived_date": payload.inactived_date,
    "created_date": payload.created_date,
    "datelastmaint": payload.datelastmaint,
    "is_approve": payload.is_approve
  }
  const result = await $http.post(URLSERVER.searchAllSegment, param);
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
    "segment_color": payload.segment_color,
    "inactived_date": payload.inactived_date,
    "created_date": "2022-04-08T09:54:19.063Z",
    "datelastmaint": "2022-04-08T09:54:19.063Z",
    "is_approve": payload.is_approve
  }

  const result = await $http.post(URLSERVER.insertSegment, param);
  console.log('call action create insert Segment', result)
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
    "segment_color": payload.segment_color,
    "inactived_date": payload.inactived_date,
    "created_date": "2022-04-08T09:54:19.063Z",
    "datelastmaint": "2022-04-08T09:54:19.063Z",
    "is_approve": payload.is_approve
  }

  const result = await $http.post(URLSERVER.updateSegmentById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const deleteSegmentById = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": payload.topic_id,
    "segment_id": payload.segment_id,
    "segment_name": payload.segment_name,
    "segment_color": payload.segment_color,
    "inactived_date": payload.inactived_date,
    "created_date": payload.created_date,
    "datelastmaint": payload.datelastmaint,
    "is_approve": payload.is_approve
  }
  const result = await $http.post(URLSERVER.deleteSegmentById, param);
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
  return true
}



// function export ra ngoài

