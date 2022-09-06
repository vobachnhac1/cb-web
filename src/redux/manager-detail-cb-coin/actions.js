import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

const setSearchManagerDetailCbCoin = (payload) => ({ type: TYPES.MANAGER_DETAIL_CB_COIN_SEARCH, payload });

export const insertManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
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

  const result = await $http.post(URLSERVER.insertCustPointCriteriaDetail, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const updateManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
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
  const result = await $http.put(URLSERVER.updateCustPointCriteriaDetail, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const deleteManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "segment_id": parseInt(payload.segment_id),
  }
  // call xuống backend url + param
  const result = await $http.delete(URLSERVER.deleteCustPointCriteriaDetail, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const searchManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  // call xuống backend url + param 
  // const result = await $http.get(URLSERVER.getCustPointCriteriaDetail);
  // const { success, data } = result;
  // if (!success || !data.success) {
  //   return false;
  // }
  // const listData = data.data; 

  //test data
  let originData = [];
  let n = 10;
  for (let i = 0; i < n; i++) {
    originData.push({
      id: '111' + `${i + 1}`,
      behaviorCode: 'LOGIN' + `${i + 1}`,
      point: 101 + i,
      numberBehavior: 1,
      type: "EVENT" + `${i + 1}`
    })
  }

  const listData = originData;

  dispatch(setSearchManagerDetailCbCoin(listData))
  return true
}

// export const filterManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
//   const result = await $http.post(URLSERVER.searchSegmentById, payload);
//   const { success, data } = result;
//   if (!success || !data.success) {
//     return false;
//   }
//   const listSegment = data.data;
//   dispatch(setSearchManagerDetailCbCoin(listSegment))

//   return {
//     "success": true,
//   }
// }

