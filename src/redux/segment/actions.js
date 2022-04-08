import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const searchSegmentDispath = (payload)=>({ type: TYPES.SEGMENT_SEARCH, payload });
// hàm xử lý được gọi từ bên ngoài
export const searchSegment = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "topic_id": 0,
    "segment_id": 0,
    "segment_name": "string",
    "segment_color": "string",
    "inactived_date": "2022-04-08T04:17:56.025Z",
    "created_date": "2022-04-08T04:17:56.025Z",
    "datelastmaint": "2022-04-08T04:17:56.025Z",
    "is_approve": true
  }
  // call xuống backend url + param 

  const result = await $http.post(URLSERVER.searchAllSegment, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listSegment = data.data;
  dispatch(searchSegmentDispath(listSegment))
  return true
}

export const insertSegment = (payload) => async (dispatch, getState, { $http }) => {
  // "topic_id": 3,
  //     "segment_id": 123,
  //     "segment_name": "nam",
  //     "segment_color": "nam red",
  //     "inactived_date": "2022-04-08T09:54:19.063Z",
  //     "created_date": "2022-04-08T09:54:19.063Z",
  //     "datelastmaint": "2022-04-08T09:54:19.063Z",
  //     "is_approve": true

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
  
  // call xuống backend url + param 

  const result = await $http.post(URLSERVER.insertSegment, param);
  console.log('call action create insert Segment',result)
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
  // call xuống backend url + param 

  const result = await $http.post(URLSERVER.updateSegmentById, param);
  const { success, data } = result;

  if (!success || !data.success) {
    return false;
  }
  return true
}

// function export ra ngoài

