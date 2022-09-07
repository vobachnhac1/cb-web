import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

const setSearchManagerDetailCbCoin = (payload) => ({ type: TYPES.MANAGER_DETAIL_CB_COIN_SEARCH, payload });

export const insertManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  const newItem = {
    behaviorCode: payload.behaviorCode,
    point: parseInt(payload.point),
    numberBehavior: parseInt(payload.numberBehavior),
    type: payload.type,
    isDelete: false
  }

  let state = getState();
  let { listManagerDetailCbCoin } = state.ManagerDetailCbCoin
  let listManagerDetailCbCoinNew = [...listManagerDetailCbCoin]
  // listManagerDetailCbCoinNew.push(newItem)
  listManagerDetailCbCoinNew.push(newItem)
  dispatch(setSearchManagerDetailCbCoin(listResultDoneArr(listManagerDetailCbCoinNew)))
  return true
}

export const updateManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    key: payload.key,
    id: payload.id,
    behaviorCode: payload.behaviorCode,
    point: parseInt(payload.point),
    numberBehavior: parseInt(payload.numberBehavior),
    type: payload.type,
    idDelete: payload.idDelete
  }

  let state = getState();
  let { listManagerDetailCbCoin } = state.ManagerDetailCbCoin
  for (let i = 0; i < listManagerDetailCbCoin.length; i++) {
    if (parseInt(listManagerDetailCbCoin[i].key) === parseInt(param.key)) {
      listManagerDetailCbCoin[i].id = param.id,
        listManagerDetailCbCoin[i].behaviorCode = param.behaviorCode,
        listManagerDetailCbCoin[i].point = parseInt(param.point),
        listManagerDetailCbCoin[i].numberBehavior = parseInt(param.numberBehavior),
        listManagerDetailCbCoin[i].type = param.type,
        listManagerDetailCbCoin[i].idDelete = param.idDelete
      break
    }
  }
  dispatch(setSearchManagerDetailCbCoin(listResultDoneArr(listManagerDetailCbCoin)))
  return true
}

export const deleteManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  // delete trong list state
  const param = {
    id: payload.id,
    key: payload.key
  }

  let state = getState();
  let { listManagerDetailCbCoin } = state.ManagerDetailCbCoin
  for (let i = 0; i < listManagerDetailCbCoin.length; i++) {
    if (parseInt(listManagerDetailCbCoin[i].key) === parseInt(param.key)) {
      listManagerDetailCbCoin[i].isDelete = true
      break
    }
  }

  dispatch(setSearchManagerDetailCbCoin(listResultDoneArr(listManagerDetailCbCoin)))
  return true
}

export const unDeleteManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  // undelete trong list state
  const param = {
    id: payload.id,
    key: payload.key
  }
  const state = getState();
  let { listManagerDetailCbCoin } = state.ManagerDetailCbCoin

  for (let i = 0; i < listManagerDetailCbCoin.length; i++) {
    if (parseInt(listManagerDetailCbCoin[i].key) === parseInt(param.key)) {
      listManagerDetailCbCoin[i].isDelete = false
      break
    }
  }

  dispatch(setSearchManagerDetailCbCoin(listResultDoneArr(listManagerDetailCbCoin)))
  return true
}

export const saveManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http0 }) => {
  //call xuống backend url + param

  let param = {
    listManagerDetailCbCoin: payload.listData
  }
  
  const result = await $http.post(URLSERVER.saveCustPointCriteriaDetail, param);
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
  let n = 5;
  for (let i = 0; i < n; i++) {
    originData.push({
      key: i,
      id: i,
      behaviorCode: 'LOGIN' + `${i + 1} `,
      point: 101 + i,
      numberBehavior: 1,
      type: "EVENT" + `${i + 1} `,
      isDelete: false
    })
  }

  const listData = originData;
  dispatch(setSearchManagerDetailCbCoin(listData))
  return true
}

function listResultDoneArr(arr) {
  let arrTamps = [...arr]
  let arrNoDelete = []
  let arrDelete = []
  for (let i = 0; i < arrTamps.length; i++) {
    if (!arrTamps[i].isDelete) {
      arrNoDelete.push(arrTamps[i])
    } else {
      arrDelete.push(arrTamps[i])
    }
  }
  let mergeArr = arrNoDelete.concat(arrDelete).map((item, index) => ({ ...item, key: index }))
  return mergeArr;
}

