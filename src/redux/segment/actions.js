import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const searchSegmentDispath = (payload)=>({ type: TYPES.SEGMENT_SEARCH, payload });
const insertSegmentDispath = (payload)=>({ type: TYPES.SEGMENT_INSERT, payload });
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

// export const insertSegment = (payload) => async (dispatch, getState, { $http }) => {
//   const param = {
  
//   }
//   // call xuống backend url + param 

//   const result = await $http.post(URLSERVER.insertSegment, param);
//   const { success, data } = result;
//   if (!success || !data.success) {
//     return false;
//   }
//   const listSegment = data.data;
//   dispatch(searchSegmentDispath(listSegment))
//   return true
// }


// function export ra ngoài

