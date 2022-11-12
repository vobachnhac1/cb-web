import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';
import moment from 'moment';
import { setToken } from '../wrapper';
import { STATE_WHEEL } from '@/constants/common';
// hàm thị thi nội bộ
const setRules = (payload) => ({ type: TYPES.RULES_SEARCH, payload });
const setRulesModal = (payload) => ({ type: TYPES.RULES_SEARCH_MODAL, payload });
const setListWheelRULE = (payload) => ({ type: TYPES.RULES_WHEEL_RULE, payload });
const setListWheelAPR = (payload) => ({ type: TYPES.RULES_WHEEL_APR, payload });
const setListWheelSTART = (payload) => ({ type: TYPES.RULES_WHEEL_START, payload });
const setListWheel = (payload) => ({ type: TYPES.RULES_WHEEL, payload });
const setListRulesStateYes = (payload) => ({ type: TYPES.RULES_STATE_YES, payload });
const setRewardHis = (payload) => ({ type: TYPES.RULES_REWARD_HIS, payload });
// const setListWheelDetail = (payload) => ({ type: TYPES.RULES_WHEEL_DETAIL, payload });

// hàm xử lý được gọi từ bên ngoài
export const filterRules = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  if(!payload.wheel_id){
    dispatch(setRules([]))
    return false;
  }
  const result = await $http.post(URLSERVER.getRulesByFilter, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    dispatch(setRules([]))
    return false;
  }
  const listRules = data.data;
  dispatch(setRules(listRules))

  return true
}
export const filterRulesModal = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  if(!payload.wheel_id){
    dispatch(setRulesModal([]))
    return false;
  }
  const result = await $http.post(URLSERVER.getRulesByFilter, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listRules = data.data;
  if(listRules && listRules.length>0){
    dispatch(setRulesModal(listRules))

  }else{
    dispatch(setRulesModal([]))
  }
  return true
}

export const approveRules = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const param = {
    rules_id: payload.rules_id,
    status_rules: !payload.status_rules || payload.status_rules && payload.status_rules == 'N' ? 'Y' : 'N',
  }
  const result = await $http.post(URLSERVER.approveRules, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }

  const getList = await $http.post(URLSERVER.getRulesByFilter, {
    wheel_id: payload.wheel_id,
  });
  const listRules = getList.data?.data;
  if (listRules && listRules.length > 0) {
    dispatch(setRules(listRules))
  }
  return true;
}

export const deleteRules = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const param = {
    rules_id: payload.rules_id,
    is_delete: 'Y',
  }
  const result = await $http.post(URLSERVER.deleteRules, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const getList = await $http.post(URLSERVER.getRulesByFilter, {
    wheel_id: payload.wheel_id,
  });
  const listRules = getList.data.data;
  if (listRules && listRules.length > 0) {
    dispatch(setRules(listRules))
  }
  return true;
}

export const updateRules = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const param = {
    from_date: moment(payload.from_date).format('YYYY-MM-DD'),
    to_date: moment(payload.to_date).format('YYYY-MM-DD'),
    rules_name: payload.rules_name,
    reward_per: payload.reward_per,
    reward: payload.reward,
    total_reward: parseInt(payload.total_reward) == 'NaN' ? 0 : parseInt(payload.total_reward),
    rules_id: payload.rules_id,
    status_rules: !payload.status_rules || payload.status_rules && payload.status_rules == 'N' ? 'N' : 'Y',
    wheel_id: payload.wheel_id,
  }
  const result = await $http.post(URLSERVER.updateRules, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }

  const getList = await $http.post(URLSERVER.getRulesByFilter, {

    from_date: null,
    rules_id: payload.rules_id,
    rules_name: null,
    status_rules: null,
    to_date: null,
    wheel_id: payload.wheel_id,
  });
  const listRules = getList.data.data;
  if (listRules && listRules.length > 0) {
    dispatch(setRules(listRules))
  }
  return true;
}

export const insertRules = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const param = {
    "from_date": moment(payload.from_date).format('YYYY-MM-DD'),
    "to_date": moment(payload.to_date).format('YYYY-MM-DD'),
    "rules_name": payload.rules_name,
    "reward_per": payload.reward_per,
    "total_reward": payload.total_reward,
    "reward": payload.reward,
    "wheel_id": payload.wheel_id,
  }
  const result = await $http.post(URLSERVER.insertRules, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true;
}
// function export ra ngoài
// rules-reward

export const getWheelWithStateRule = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  try {
    const params = { wheel_status: STATE_WHEEL.RULE }
    const result = await $http.get(URLSERVER.selectWheelApproved, params);
    const { success, data } = result;
    if (!success || !data.success) {
      dispatch(setListWheelRULE([]))
      return false;
    }
    const listWheel = data.data;
    dispatch(setListWheelRULE(listWheel))
    return true;
  } catch (error) {
    console.log('error: ', error);
    return false
  }
}

export const getWheelDtStateApprove = (payload) => async (dispatch, getState, { $http }) => {

  setToken(getState(),$http)
  try {
    const params = {
      wheel_id: payload
    }
    const result = await $http.get(URLSERVER.getWheelDtStateApprove, params);
    const { success, data } = result;
    if (!success || !data.success) {
      return [];
    }
    const listWheelDetail = data.data;
    return listWheelDetail;
  } catch (error) {
    console.log('error: ', error);
    return []
  }
}

export const updateWheelDetailWithRules = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  try {
    const result = await $http.post(URLSERVER.updateWheelDetailWithRules, payload);
    const { success, data } = result;
    if (!success || !data.success) {
      return false;
    }
    return true;
  } catch (error) {
    return false
  }
}

export const generateRewardOfRules = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  try {
    const result = await $http.post(URLSERVER.generateRewardOfRules, payload);
    const { success, data } = result;
    if (!success || !data.success) {
      return false;
    }
    return true;
  } catch (error) {
    return false
  }
}

export const nextStepWheel = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  try {
    const { wheel_id, wheel_status } = payload;
    const result = await $http.post(URLSERVER.updateStateWheel, {
      wheel_id: wheel_id, 
      wheel_status: STATE_WHEEL.APR
    });
    const { success } = result;
    if (success) {
      const resultList = await $http.get(URLSERVER.selectWheelApproved);
      console.log('resultList: ', resultList);
      // if (!resultList.success || !resultList.data.success) {
      //   dispatch(setListWheel([]))
      // }
      // dispatch(setListWheel(resultList.data.data))
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false
  }
}


// Màn hình Phê duyệt Wheel đã hợp lệ

export const getWheelScreenRules = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  try {
    const result = await $http.get(URLSERVER.selectWheelApproved, payload);
    const { success, data } = result;
    if (!success || !data.success) {
      dispatch(setListWheel([]))
      return false;
    }
    dispatch(setListWheel(data.data))
    return true;
  } catch (error) {
    return false
  }
}

export const getWheelScreenRulesAPR = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  try {
    const params = {
      wheel_status_arr: [STATE_WHEEL.EDIT, STATE_WHEEL.NEW, STATE_WHEEL.SAVE, STATE_WHEEL.RULE]
    }
    const result = await $http.post(URLSERVER.getWheelWithStateApprove, params);
    
    const { success, data } = result;
    if (!success || !data.success) {
      dispatch(setListWheelAPR([]))
      return false;
    }
    dispatch(setListWheelAPR(data.data))
    return true;
  } catch (error) {
    return false
  }
}

export const updateStateWheel = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  try {
    const { wheel_id, wheel_status } = payload;
    const result = await $http.post(URLSERVER.updateStateWheel, {
      wheel_id: wheel_id, wheel_status: wheel_status
    });
    const { success } = result;
    // if (success) {
    //   const resultList = await $http.get(URLSERVER.selectWheelApproved);
    //   console.log('resultList: ', resultList);
    //   if (!resultList.success || !resultList.data.success) {
    //     dispatch(setListWheel([]))
    //   }
    //   dispatch(setListWheel(resultList.data.data))
    //   return true;
    // } else {
    //   return false;
    // }
    return success;

  } catch (error) {
    return false
  }
}

export const getListRulesStateApprove = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  // lấy rules theo mã vòng quay
  if(!payload.wheel_id){
    dispatch(setListRulesStateYes([]))
    return false;
  }
  const result = await $http.post(URLSERVER.getRulesByFilter, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listRules = data.data;
  dispatch(setListRulesStateYes(listRules))
  return true
}

export const updateWheelWithRules = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const result = await $http.post(URLSERVER.updateWheelWithRules, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

export const getRewardHistory = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const result = await $http.post(URLSERVER.getRewardHistory, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    dispatch(setRewardHis([]))
    return false;
  }
  const listRewardHis = data.data;
  if (listRewardHis && listRewardHis.length > 0) {
    dispatch(setRewardHis(listRewardHis))
  } else {
    dispatch(setRewardHis([]))
  }
  return true
}

export const comfirmReceived = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  const result = await $http.get(URLSERVER.comfirmReceived, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  return true
}

// màn hình Quản lý thông tin trúng thưởng
export const getWheelScreenRulesSTART = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)
  try {
    const params = {
      wheel_status_arr: [STATE_WHEEL.EDIT, STATE_WHEEL.NEW, STATE_WHEEL.SAVE, STATE_WHEEL.RULE, STATE_WHEEL.APR]
    }
    const result = await $http.post(URLSERVER.getWheelWithStateApprove, params);
    
    const { success, data } = result;
    if (!success || !data.success) {
      dispatch(setListWheelSTART([]))
      return false;
    }
    dispatch(setListWheelSTART(data.data))
    return true;
  } catch (error) {
    return false
  }
}


const signOutDispatch = () => ({ type: TYPES.SIGN_OUT})

export const SignOut = () => async (dispatch, getState, { $http }) => {
  dispatch(signOutDispatch());
}