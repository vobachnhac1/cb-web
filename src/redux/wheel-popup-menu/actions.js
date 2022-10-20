import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';
import { setToken } from '../wrapper';

// hàm thị thi nội bộ
const setListReward = (payload) => ({ type: TYPES.WHEELPOPUPMENU_REWARD_SEARCH, payload });
const setListWheelDetailById = (payload) => ({ type: TYPES.WHEELPOPUPMENU_WHEELDETAILBYID_SEARCH, payload });
const setListCustomer = (payload) => ({ type: TYPES.WHEELPOPUPMENU_CUSTOMER_SEARCH, payload });

const setAllList = (payload) => ({ type: TYPES.WHEELPOPUPMENU_SEARCHALL, payload })


// hàm xử lý được gọi từ bên ngoài

export const getAllDataHistory = (payload) => async (dispatch, getState, { $http }) => {
  setToken(getState(),$http)

  const params = {
    wheelId: payload.wheelId,
    systemCode: payload.systemCode,
    userId: payload.userId,
    numCustomer: payload.numCustomer,
    numReward: payload.numReward,
    customerId: -1,
    numReward :payload.numReward
  }
  // let success ;

  // call xuống backend url + param 
  // Lịch sử trúng của khách hàng của vòng quay hiện tại
  const resultListReward = await $http.get(`${URLSERVER.getRewardUserIdByWheelID}/${params.userId}/${params.wheelId}/${params.numReward}`);
  const dataFuncListReward = searchListReward(resultListReward)

  // Danh sách giải trúng đã được cài không  có data hình ảnh của vòng quay hiện tại
  const resultListWheelDetailById = await $http.get(`${URLSERVER.getWheelByWheelIdNoImages}/${params.systemCode}/${params.wheelId}`);
  const dataFuncListWheelDetailById = searchListWheelDetailById(resultListWheelDetailById)

  // Danh sách khách hàng đã trúng giải của quay vong hiện tại
  const resultListCustomer = await $http.get(`${URLSERVER.getCusPointGetCustomer}/${params.numCustomer}/${params.wheelId}/${params.customerId}`);
  const dataFuncListCustomer = searchListCustomer(resultListCustomer)

  if (!dataFuncListReward.success) {
    return false;
  } else if (!dataFuncListWheelDetailById.success) {
    return false;
  } else if (!dataFuncListCustomer.success) {
    return false;
  }

  dispatch(setAllList({ listReward: dataFuncListReward.listReward, listWheelDetailById: dataFuncListWheelDetailById.listWheelDetailById, listCustomer: dataFuncListCustomer.listCustomer }))
  return true
}


const searchListReward = (result) => {
  const { success, data } = result;
  if (!success) {
    return false;
  }
  const listReward = data.data;
  return {
    listReward: listReward,
    success: success
  }
}

const searchListWheelDetailById = (result) => {
  const { success, data } = result;
  if (!success) {
    return false;
  }
  const listWheelDetailById = data.data;
  return {
    listWheelDetailById: listWheelDetailById,
    success: success
  }
}

const searchListCustomer = (result) => {
  const { success, data } = result;
  if (!success) {
    return false;
  }
  const listCustomer = data.data;
  return {
    listCustomer: listCustomer,
    success: success
  }
}

// function export ra ngoài

const signOutDispatch = () => ({ type: TYPES.SIGN_OUT})

export const SignOut = () => async (dispatch, getState, { $http }) => {
  dispatch(signOutDispatch());
}