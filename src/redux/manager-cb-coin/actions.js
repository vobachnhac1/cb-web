import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';
import moment from 'moment';

const setSearchManagerCbCoin = (payload) => ({ type: TYPES.MANAGER_CB_COIN_SEARCH, payload });

export const insertManagerCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    criteria_name: payload.criteria_name,
    from_date: payload.from_date,
    to_date: payload.to_date,
    status: payload.status,
    systemCd: "string",
    created_by: "string",
    updated_by: "string",
    isDelete: false
  }

  const result = await $http.post(URLSERVER.insertCustPointCriteria, param);
  const { success, data } = result;
  if (!success) {
    return false;
  }
  return true
}

export const updateManagerCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  // call xuống backend url + param
  const param = {
    ord_numbers: payload.ord_numbers,
    criteria_code: parseInt(payload.criteria_code),
    criteria_name: payload.criteria_name,
    from_date: payload.from_date,
    to_date: payload.to_date,
    status: payload.status,
    isDelete: payload.isDelete,
    systemCd: "string",
    created_by: "string",
    updated_by: "string"
  }
  const indexChange = payload.indexChange

  const result = await $http.put(URLSERVER.updateCustPointCriteria, param);
  const { success, data } = result;
  if (!success) {
    return false;
  } else {
    // nếu cập nhật thành công thì change data trên state
    let state = getState()
    let { listManagerCbCoin } = state.ManagerCbCoin
    let listManagerCbCoinNEw = [...listManagerCbCoin]
    listManagerCbCoinNEw.splice(indexChange, 1, { ...param })
    dispatch(setSearchManagerCbCoin(listManagerCbCoinNEw))
    return true
  }
 
}

export const deleteManagerCbCoinById = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    criteriaCode: parseInt(payload.criteria_code),
    username: 'ADMIN'  // username is  update by name of user

  }
  // call xuống backend url + param
  const result = await $http.delete(`${URLSERVER.deleteCustPointCriteria}/${param.criteriaCode}/${param.username}`);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const searchManagerCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  // call xuống backend url + param 
  const result = await $http.get(`${URLSERVER.getCustPointCriteria}/${null}/${null}/${null}/${null}`);
  const { success, data } = result;
  if (!success) {
    return false;
  }
  const listdata = data.data;
  dispatch(setSearchManagerCbCoin(chagneDateObject(listdata)))
  return true
}

function chagneDateObject(arrs) {
  let arrsTemps = [...arrs];
  for (let i = 0; i < arrsTemps.length; i++) {
    arrsTemps[i].from_date = moment(arrsTemps[i].from_date)
    arrsTemps[i].to_date = moment(arrsTemps[i].to_date)
  }
  return arrsTemps
}


