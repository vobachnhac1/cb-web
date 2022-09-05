import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

const setSearchManagerCbCoin = (payload) => ({ type: TYPES.MANAGER_CB_COIN_SEARCH, payload });

export const insertManagerCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    criteria_name: payload.criteria_name,
    from_date: payload.from_date,
    to_date: payload.to_date,
    status: payload.status
  }

  const result = await $http.post(URLSERVER.insertCustPointCriteria, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const updateManagerCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    criteria_id: parseInt(payload.criteria_id)
  }
  // call xuống backend url + param
  const result = await $http.put(URLSERVER.updateCustPointCriteria, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const deleteManagerCbCoinById = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    criteria_id: parseInt(payload.criteria_id)
  }
  // call xuống backend url + param
  const result = await $http.delete(URLSERVER.deleteCustPointCriteria, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const searchManagerCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  // call xuống backend url + param 
  const result = await $http.get(URLSERVER.getCustPointCriteria);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listSegment = data.data; 
  dispatch(setSearchManagerCbCoin(listSegment))
  return true
}

// export const filterManagerCbCoin = (payload) => async (dispatch, getState, { $http }) => {
//   const result = await $http.post(URLSERVER.MANAGER_CB_COIN_SEARCH_BY_ID, payload);
//   const { success, data } = result;
//   if (!success || !data.success) {
//     return false;
//   }
//   const listSegment = data.data;
//   dispatch(setSearchManagerCbCoin(listSegment))

//   return {
//     "success": true,
//   }
// }

