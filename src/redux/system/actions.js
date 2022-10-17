import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const _setPathsFEList = (payload) => ({ type: TYPES.SET_PATHS_FE, payload});
const _setPathsBEList = (payload) => ({ type: TYPES.SET_PATHS_BE, payload});
const _setRolesList   = (payload) => ({ type: TYPES.SET_ROLES, payload});
const _setAccountList = (payload) => ({ type: TYPES.SET_ACCOUNT, payload});
const _setSystemList  = (payload) => ({ type: TYPES.SET_SYSTEM, payload});

// done
export const setPathsList = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const { global: { userProfile } } =  getState();
  const {perSystem, systemCode, roleId} = payload;
  const url = URLSERVER.getPathsList +"/"+roleId+"/"+systemCode+"/"+perSystem;
  const result = await $http.get(url)
  const {success, data } = result;
  if(success){
    if(perSystem =='FE'){
      dispatch(_setPathsFEList(data.data));
    }else{
      dispatch(_setPathsBEList(data.data));
    }
  }
}

export const insertSysPerURL = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const url = URLSERVER.urlSysPerUrlManagement;
  const result = await $http.post(url,payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}

export const updateSysPerURL = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const url = URLSERVER.urlSysPerUrlManagement;
  const result = await $http.put(url,payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}

export const deleteSysPerURL  = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const url = URLSERVER.urlSysPerUrlManagement;
  const result = await $http.delete(url+payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}
// done
export const setRolesList = () => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const url = URLSERVER.getRolesList +"/false";
  const result = await $http.get(url)
  const {success, data } = result;
  if(success){
    dispatch(_setRolesList(data.data));
  }
}


export const updateSysRole = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const url = URLSERVER.urlSysRoleManagement;
  const result = await $http.put(url,payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}

export const insertSysRole = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const url = URLSERVER.urlSysRoleManagement;
  const result = await $http.post(url,payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}

export const deleteSysRole = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const url = URLSERVER.urlSysRoleManagement;
  const result = await $http.delete(url+payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}
//done
export const setAccountList = () => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const status = 1;
  const url = URLSERVER.getAccountList +"/false/" + status;
  const result = await $http.get(url)
  const {success, data } = result;
  if(success){
    dispatch(_setAccountList(data.data));
  }
}


export const insertAccount = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const url = URLSERVER.urlSysAccountManagement;
  const result = await $http.post(url,payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}

export const updateAccount = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)


  const url = URLSERVER.urlSysAccountManagement;
  const result = await $http.put(url,payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}

export const deleteAccount = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const url = URLSERVER.urlSysAccountManagement;
  const result = await $http.delete(url+payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}

//done
export const setSystemList = () => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const url = URLSERVER.getSystemList +"/false";
  try {
    const result = await $http.get(url)
    const {success = false, data } = result;
    if(success){
      dispatch(_setSystemList(data?.data));
      return
    }
    dispatch(_setSystemList(data?.data));
  } catch (error) {
    console.log('error111111: ', error);
    dispatch(_setSystemList(null));
  }
}

export const insertSystem = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const url = URLSERVER.urlSystemManagement;
  const result = await $http.post(url,payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}

export const updateSystem = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const url = URLSERVER.urlSystemManagement;
  const result = await $http.put(url,payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}

export const deleteSystem = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const url = URLSERVER.urlSystemManagement;
  const result = await $http.delete(url+payload)
  const {success, data } = result;
  if(success){
    return {
      ...data,
      visible: data?.success
    }
  }
  return {...data, visible: data?.success }
}


// ---------------------
const signOutDispatch = () => ({ type: TYPES.SIGN_OUT})

export const SignOut = () => async (dispatch, getState, { $http }) => {
  dispatch(signOutDispatch());
}

const setToken =(state,  $http)=>{
  const {global:{access_token} } = state;
  if(access_token){
    $http.setAccessToken(access_token)
  }else{
    dispatch(signOutDispatch());
  }
}