import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

const setSearchManagerDetailCbCoin = (payload) => ({ type: TYPES.MANAGER_DETAIL_CB_COIN_SEARCH, payload });

export const insertManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  const newItem = {
    behaviorCode: payload.behaviorCode.toUpperCase(),
    behaviorName: payload.behaviorName,
    point: parseInt(payload.point),
    numBehavior: parseInt(payload.numBehavior),
    type: payload.type,
    isDelete: false,
    createdBy: 'NHACVB',
    criteria_code: payload.cbCoin_id,
    status: "Y",
    systemCd: "DL",
    updatedBy: 'NHACVB'
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
    behaviorCode: payload.behaviorCode.toUpperCase(),
    behaviorName: payload.behaviorName,
    point: parseInt(payload.point),
    numBehavior: parseInt(payload.numBehavior),
    type: payload.type,
    idDelete: payload.idDelete
  }
  let state = getState();
  let { listManagerDetailCbCoin } = state.ManagerDetailCbCoin
  for (let i = 0; i < listManagerDetailCbCoin.length; i++) {
    if (parseInt(listManagerDetailCbCoin[i].key) === parseInt(param.key)) {
      listManagerDetailCbCoin[i].id = param.id,
        listManagerDetailCbCoin[i].behaviorCode = param.behaviorCode,
        listManagerDetailCbCoin[i].behaviorName = param.behaviorName,
        listManagerDetailCbCoin[i].point = parseInt(param.point),
        listManagerDetailCbCoin[i].numBehavior = parseInt(param.numBehavior),
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

export const saveManagerDetailCbCoin = (payload) => async (dispatch, getState, { $http }) => {
  //call xuống backend url + param

  let param = {
    listManagerDetailCbCoin: payload.data
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
  let params = {
    cbCoin_id: payload.cbCoin_id
  }
  const result = await $http.get(`${URLSERVER.getCustPointCriteriaDetail}/${params.cbCoin_id}`);
  const { success, data } = result;
  if (!success) {
    return false;
  } else {
    const listData = data.data;
    // dispatch(setSearchManagerDetailCbCoin(listData))
    dispatch(setSearchManagerDetailCbCoin(listResultDoneArr(listData)))
    return true

  }
}

// check behavior have duplicate
export const checkBehavior = (payload) => async (dispatch, getState, { $http }) => {
  const params = {
    behaviorCode: payload.behaviorCode,
  }
  const state = getState();
  let { listManagerDetailCbCoin } = state.ManagerDetailCbCoin
  for (let i = 0; i < listManagerDetailCbCoin.length; i++) {
    // console.log('listManagerDetailCbCoin.behaviorCode', listManagerDetailCbCoin.behaviorCode)
    // console.log('params.behaviorCode', params.behaviorCode)

    console.log('listManagerDetailCbCoin.behaviorCode === params.behaviorCode', listManagerDetailCbCoin.behaviorCode === params.behaviorCode)
    if (listManagerDetailCbCoin[i].behaviorCode === params.behaviorCode.toUpperCase()) {
      return {
        success: false,
        message: `Mã tích điểm ${params.behaviorCode} đã tồn tại`
      }
    }
  }

  const result = await $http.get(`${URLSERVER.checkBehaviorCodeCustPointCriteriaDetail}/${params.behaviorCode}`);
  const { success, message } = result.data;

  return {
    success,
    message
  }
}

// sắp xếp những phần tử xóa và phần tử bị xóa
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

