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
  const { global: { userProfile } } =  getState();
  const {perSystem } = payload;
  // const url = URLSERVER.getPathsList +"/"+roleId+"/"+systemCode+"/"+perSystem;

  const {roleId, systemCode } = userProfile;
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

// done
export const setRolesList = () => async (dispatch, getState, { $http }) => {
  const url = URLSERVER.getRolesList +"/false";
  const result = await $http.get(url)
  const {success, data } = result;
  if(success){
    dispatch(_setRolesList(data.data));
  }
}

//done
export const setAccountList = () => async (dispatch, getState, { $http }) => {
  const status = 1;
  const url = URLSERVER.getAccountList +"/false/" + status;
  const result = await $http.get(url)
  const {success, data } = result;
  if(success){
    dispatch(_setAccountList(data.data));
  }
}

//done
export const setSystemList = () => async (dispatch, getState, { $http }) => {
  const url = URLSERVER.getSystemList +"/false";
  const result = await $http.get(url)
  const {success, data } = result;
  if(success){
    dispatch(_setSystemList(data.data));
  }
}



const signOutDispatch = () => ({ type: TYPES.SIGN_OUT})

export const SignOut = () => async (dispatch, getState, { $http }) => {
  dispatch(signOutDispatch());
}