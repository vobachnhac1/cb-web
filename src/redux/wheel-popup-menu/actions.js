import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';
// listReward: [],
//     listWheelDetailById: [],
//     listCustomer: [],
// hàm thị thi nội bộ
const setListReward = (payload) => ({ type: TYPES.WHEELPOPUPMENU_REWARD_SEARCH, payload });
const setListWheelDetailById = (payload) => ({ type: TYPES.WHEELPOPUPMENU_WHEELDETAILBYID_SEARCH, payload });
const setListCustomer = (payload) => ({ type: TYPES.WHEELPOPUPMENU_CUSTOMER_SEARCH, payload });
// hàm xử lý được gọi từ bên ngoài

export const searchListReward = (payload) => async (dispatch, getState, { $http }) => { 
  const params={

  }

}

export const searchListWheelDetailById = (payload) => async (dispatch, getState, { $http }) => {
  const params={
      
  }

}

export const searchListCustomer = (payload) => async (dispatch, getState, { $http }) => {
  const params={
    
  }

}

// function export ra ngoài

