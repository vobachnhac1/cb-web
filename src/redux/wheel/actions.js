import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';
import { setToken } from '../wrapper';

// hàm thị thi nội bộ
const setSearchWheel = (payload) => ({ type: TYPES.WHEEL_SEARCH, payload });
const setPagination = (payload) => ({ type: TYPES.WHEEL_PAGE, payload });

// hàm xử lý được gọi từ bên ngoài

export const searchWheel = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const {item_page,current_page, wheel_name='',from_date_act,to_date_act }= payload;
  const _url = `/${current_page}/${item_page}/NONE/${from_date_act}/${to_date_act}/${wheel_name?.toString().trim().length > 0? wheel_name:'null'}/null`
  // call xuống backend url + param 
  const result = await $http.get(URLSERVER.searchAllWheel+_url);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listWheel = data.data?.list_wheel;
  const pagination = data.data?.pagination;
  dispatch(setSearchWheel(listWheel))
  dispatch(setPagination(pagination))
  return true
}

export const insertWheel = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  // call xuống backend url + param
  const result = await $http.post(URLSERVER.insertWheel, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const updateWheel = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  // call xuống backend url + param 
  const result = await $http.put(URLSERVER.updateWheelById, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const deleteWheelById = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

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

// check xem có bỏ được ko 
export const filterWheel = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

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
  setToken(getState(),$http)

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