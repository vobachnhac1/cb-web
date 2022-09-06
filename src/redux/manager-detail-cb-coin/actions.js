import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

const setSearchManagerDetailCbCoin = (payload) => ({ type: TYPES.MANAGER_DETAIL_CB_COIN_SEARCH, payload });

export const insertManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    behaviorCode: payload.behaviorCode,
    point: parseInt(payload.point),
    numberBehavior: parseInt(payload.numberBehavior),
    type: payload.type
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
    id: payload.id,
    behaviorCode: payload.behaviorCode,
    point: parseInt(payload.point),
    numberBehavior: parseInt(payload.numberBehavior),
    type: payload.type
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
    id: payload.id,
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

