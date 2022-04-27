import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';
import moment from 'moment';
// hàm thị thi nội bộ
const setRules = (payload) => ({ type: TYPES.RULES_SEARCH, payload });
const setListWheelApproved = (payload) => ({ type: TYPES.RULES_WHEEL_APPROVED, payload });

// hàm xử lý được gọi từ bên ngoài

export const filterRules = (payload) => async (dispatch, getState, { $http }) => {
  const result = await $http.post(URLSERVER.getRulesByFilter, payload);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listRules = data.data;
  dispatch(setRules(listRules))
  return true
}

export const approveRules = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    // "from_date": moment(payload.from_date).format('YYYY-MM-DD'),
    // "to_date": moment(payload.to_date).format('YYYY-MM-DD'),
    // "rules_name": payload.rules_name,
    // "total_reward": payload.total_reward,
    // "status_rules": payload.status_rules,
    rules_id: payload.rules_id,
    status_rules: !payload.status_rules || payload.status_rules && payload.status_rules == 'N' ? 'Y' : 'N',
  }
  const result = await $http.post(URLSERVER.approveRules, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }

  const getList = await $http.post(URLSERVER.getRulesByFilter);
  const listRules = getList.data.data;
  if (listRules && listRules.length > 0) {
    dispatch(setRules(listRules))
  }
  return true;
}

export const deleteRules = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    rules_id: payload.rules_id,
    is_delete: 'Y',
  }
  const result = await $http.post(URLSERVER.deleteRules, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const getList = await $http.post(URLSERVER.getRulesByFilter);
  const listRules = getList.data.data;
  if (listRules && listRules.length > 0) {
    dispatch(setRules(listRules))
  }
  return true;
}

export const updateRules = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    from_date: moment(payload.from_date).format('YYYY-MM-DD'),
    to_date: moment(payload.to_date).format('YYYY-MM-DD'),
    rules_name: payload.rules_name,
    total_reward: payload.total_reward,
    rules_id: payload.rules_id,
    status_rules: !payload.status_rules || payload.status_rules && payload.status_rules == 'N' ? 'N' : 'Y',
  }
  const result = await $http.post(URLSERVER.updateRules, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }

  const getList = await $http.post(URLSERVER.getRulesByFilter);
  const listRules = getList.data.data;
  if (listRules && listRules.length > 0) {
    dispatch(setRules(listRules))
  }
  return true;
}

export const insertRules = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "from_date": moment(payload.from_date).format('YYYY-MM-DD'),
    "to_date": moment(payload.to_date).format('YYYY-MM-DD'),
    "rules_name": payload.rules_name,
    "total_reward": payload.total_reward,
  }
  const result = await $http.post(URLSERVER.insertRules, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }

  const getList = await $http.post(URLSERVER.getRulesByFilter);
  const listRules = getList.data.data;
  if (listRules && listRules.length > 0) {
    dispatch(setRules(listRules))
  }
  return true;
}
// function export ra ngoài
// rules-reward

export const getWheelWithStateApprove = (payload) => async (dispatch, getState, { $http }) => {
  try {
    const params = {
      wheel_name: null,
      wheel_status: 'APR',
      from_date_act: null,
      to_date_act: null
    }
    const result = await $http.post(URLSERVER.getWheelWithStateApprove, params);
    const { success, data } = result;
    if (!success || !data.success) {
      dispatch(setListWheelApproved([]))
      return false;
    }
    const listWheel = data.data;
    dispatch(setListWheelApproved(listWheel))
    return true;
  } catch (error) {
    console.log('error: ', error);
    return false
  }
}

