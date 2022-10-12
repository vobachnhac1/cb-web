import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const setSearchWheel = (payload) => ({ type: TYPES.WHEEL_SEARCH, payload });
// hàm xử lý được gọi từ bên ngoài

export const searchWheel = (payload) => async (dispatch, getState, { $http }) => {
  // call xuống backend url + param 
  const result = await $http.get(URLSERVER.searchAllWheel);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listWheel = data.data;
  dispatch(setSearchWheel(listWheel))
  return true
}

export const insertWheel = (payload) => async (dispatch, getState, { $http }) => {
  // call xuống backend url + param
  const result = await $http.post(URLSERVER.insertWheel, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const updateWheel = (payload) => async (dispatch, getState, { $http }) => {
  // call xuống backend url + param 
  const result = await $http.put(URLSERVER.updateWheelById, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const deleteWheelById = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": parseInt(payload.wheel_id),
  }
  // call xuống backend url + param 
  const result = await $http.delete(URLSERVER.deleteWheelById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const filterWheel = (payload) => async (dispatch, getState, { $http }) => {
  const result = await $http.post(URLSERVER.searchWheelById, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listWheel = data.data;
  dispatch(setSearchWheel(listWheel))
  return true
}

export const sendAppove = (payload) => async (dispatch, getState, { $http }) => {
  const result = await $http.post(URLSERVER.updateStateWheel, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}


// function export ra ngoài

const signOutDispatch = () => ({ type: TYPES.SIGN_OUT})

export const SignOut = () => async (dispatch, getState, { $http }) => {
  dispatch(signOutDispatch());
}