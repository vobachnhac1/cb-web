import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';
import moment from 'moment';
// import folor from '../../../public/images/wheelReward'
// import fs from 'fs'


// hàm thị thi nội bộ
const setSearchWheelDetail = (payload) => ({ type: TYPES.WHEELDETAIL_SEARCH, payload });
const setDataCheckWheel = (payload) => ({ type: TYPES.WHEELDETAIL_DATACHECKWHEEL, payload })

// const setWheelDetailNo = (payload) => ({ type: TYPES.WHEELDETAIL_NO, payload });
// // hàm xử lý được gọi từ bên ngoài
export const searchWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": 0,
    "wheel_detail_id": 0,
    "segment_id": 0,
    "no": 0,
    "goal_yn": 0,
    "remain_value": 0,
    "remain_number": 0,
    "inactived_date": "2022-04-11T06:06:50.653Z",
    "created_date": "2022-04-11T06:06:50.653Z",
    "datelastmaint": "2022-04-11T06:06:50.653Z",
    "is_approve": true
  }
  // call xuống backend url + param 
  const result = await $http.get(URLSERVER.searchAllWheelDetail, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listWheelDetail = data.data; 0
  dispatch(setSearchWheelDetail(listWheelDetail))
  return true
}

export const SaveOnListWheelDetail = (payload) => async (dispatch, getState, { $http }) => {

  const param = {
    "wheel_id": payload.wheel_id,
    "list_wheel_detail": payload.data,
    "list_length": payload.data.length,
    'wheel_curt_value': payload.wheel_curt_value,
    "wheel_total_value": payload.wheel_total_value,
    "num_segment_wheel": payload.num_segment_wheel,
    "wheel_status": payload.wheel_status
  }
  const result = await $http.post(URLSERVER.updateWheelDetailUpdateList, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const { listData, no } = resultDoneWheelDetail(data.data.list_wheel_dt.map(item => ({ ...item, is_delete: false })));
  const Wheel_detail_total_value = sumTotalValueWheelDetail(listData)

  const dataObject = {
    'success': true,
    'listData': listData,
    'wheel_curt_value': data.data.wheel_curt_value,
    'wheel_total_value': data.data.wheel_total_value,
    'Wheel_detail_total_value': Wheel_detail_total_value,
    'no': no
  }

  dispatch(setSearchWheelDetail(dataObject))
  dispatch(setDataCheckWheel({
    'num_segment_wheel': data.data.num_segment_wheel,
    'wheel_status': data.data.wheel_status
  }))
  return dataObject

}

export const insertWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": parseInt(payload.wheel_id),
    "wheel_name": payload.wheel_name,
    "wheel_detail_id": payload.wheel_detail_id,
    "segment_id": parseInt(payload.segment_id),
    "segment_name": payload.segment_name,
    "no": parseInt(payload.no),
    "goal_yn": parseInt(payload.goal_yn),
    "remain_value": parseInt(payload.remain_value),
    "remain_number": parseInt(payload.remain_number),
    "imgBase64": payload.imgBase64 ? payload.imgBase64 : null,
    "inactived_date": null,
    "created_date": moment().format('YYYY-MM-DD, hh:mm:ss'),
    "datelastmaint": null,
    "is_approve": true,
    "is_delete": false
  }


  let state = getState()
  // let listWheelDetail = [...state.wheeldetail.listWheelDetail]
  let { listWheelDetail, wheelCurtValue, wheelTotalValue } = state.wheeldetail

  listWheelDetail.push(param)
  const { listData, no } = resultDoneWheelDetail(listWheelDetail)

  const wheelDetialTotalValue = sumTotalValueWheelDetail(listWheelDetail)
  const wheelCurtValue_update = parseInt(wheelTotalValue) - parseInt(wheelDetialTotalValue)

  const dataObject = {
    'listData': listData,
    'wheel_curt_value': wheelCurtValue_update,
    'wheel_total_value': wheelTotalValue,
    'Wheel_detail_total_value': wheelDetialTotalValue,
    'no': no
  }

  dispatch(setSearchWheelDetail(dataObject))

  return listData
}

export const updateWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_detail_id": payload.wheel_detail_id,
    "no": parseInt(payload.no),
    "goal_yn": parseInt(payload.goal_yn),
    "segment_id": parseInt(payload.segment_id),
    "segment_name": payload.segment_name,
    "remain_value": parseInt(payload.remain_value),
    "remain_number": parseInt(payload.remain_number),
    "imgBase64": payload.imgBase64 ? payload.imgBase64 : null,
    "key": payload.key
  }

  let state = getState()
  // const a {}
  let { listWheelDetail, wheelCurtValue, wheelTotalValue } = state.wheeldetail

  for (let i = 0; i < listWheelDetail.length; i++) {
    if (listWheelDetail[i].key === param.key) {
      listWheelDetail[i].no = param.no
      listWheelDetail[i].goal_yn = param.goal_yn
      listWheelDetail[i].remain_number = param.remain_number
      listWheelDetail[i].remain_value = param.remain_value
      listWheelDetail[i].segment_id = param.segment_id
      listWheelDetail[i].segment_name = param.segment_name
      listWheelDetail[i].imgBase64 = param.imgBase64
    }
  }

  const wheelDetialTotalValue = sumTotalValueWheelDetail(listWheelDetail)
  const wheelCurtValue_update = parseInt(wheelTotalValue) - parseInt(wheelDetialTotalValue)

  const { listData, no } = resultDoneWheelDetail(listWheelDetail);

  const dataObject = {
    'listData': listData,
    'wheel_curt_value': wheelCurtValue_update,
    'wheel_total_value': wheelTotalValue,
    'Wheel_detail_total_value': wheelDetialTotalValue,
    'no': no
  }

  dispatch(setSearchWheelDetail(dataObject))
  return listData
}

// xóa phần tử trong state wheelDetail bằng is_delete = true
export const deleteWheelDetailById = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_detail_id": payload.wheel_detail_id,
    "key": payload.key
  }
  let state = getState()
  let { listWheelDetail, wheelCurtValue, wheelTotalValue } = state.wheeldetail
  for (let i = 0; i < listWheelDetail.length; i++) {
    if (listWheelDetail[i].key === param.key) {
      listWheelDetail[i].is_delete = true
      // listDeleted.push(listWheelDetail[i])
      break
    }
  }

  const wheelDetialTotalValue = sumTotalValueWheelDetail(listWheelDetail)
  const wheelCurtValue_update = parseInt(wheelTotalValue) - parseInt(wheelDetialTotalValue)
  const { listData, no } = resultDoneWheelDetail(listWheelDetail);

  const dataObject = {
    'listData': listData,
    'wheel_curt_value': wheelCurtValue_update,
    'wheel_total_value': wheelTotalValue,
    'Wheel_detail_total_value': wheelDetialTotalValue,
    'no': no
  }
  dispatch(setSearchWheelDetail(dataObject))
  return listData
}

// phục hồi phần tử trong state wheelDetail bằng is_delete = false
export const restoreWheelDetailById = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_detail_id": payload.wheel_detail_id,
    "key": payload.key
  }
  let state = getState()
  let { listWheelDetail, wheelCurtValue, wheelTotalValue } = state.wheeldetail
  for (let i = 0; i < listWheelDetail.length; i++) {
    if (listWheelDetail[i].key === param.key) {
      listWheelDetail[i].is_delete = false
      break
    }
  }
  // const listData = resultDoneWheelDetail(listWheelDetail);
  // dispatch(setSearchWheelDetail(listData))
  const wheelDetialTotalValue = sumTotalValueWheelDetail(listWheelDetail)
  const wheelCurtValue_update = parseInt(wheelTotalValue) - parseInt(wheelDetialTotalValue)
  const { listData, no } = resultDoneWheelDetail(listWheelDetail)
  // listData.map(item => ({ ...item }));
  const dataObject = {
    'listData': listData,
    'wheel_curt_value': wheelCurtValue_update,
    'wheel_total_value': wheelTotalValue,
    'Wheel_detail_total_value': wheelDetialTotalValue,
    'no': no
  }
  dispatch(setSearchWheelDetail(dataObject))

  return listData
}

// get all data wheel_Detail from wheel_id
export const filterWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  let param = {
    "wheel_id": payload.wheel_id ? parseInt(payload.wheel_id) : null,
    "wheel_detail_id": payload.wheel_detail_id ? parseInt(payload.wheel_detail_id) : null,
    "segment_id": payload.segment_id ? parseInt(payload.segment_id) : null,
    "no": payload.no ? parseInt(payload.no) : null,
    "goal_yn": payload.goal_yn ? parseInt(payload.goal_yn) : null,
    "remain_value": payload.remain_value ? parseInt(payload.remain_value) : null,
    "remain_number": payload.remain_number ? parseInt(payload.remain_number) : null,
    "imgBase64": payload.imgBase64 ? payload.imgBase64 : null,

    "inactived_date": null,
    "created_date": null,
    "datelastmaint": null,
    "is_approve": true
  }
  const result = await $http.post(URLSERVER.searchWheelDetailByfilter, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }


  const { listData, no } = resultDoneWheelDetail(data.data.list_wheel_dt.map(item => ({ ...item, is_delete: false })))


  // await listData.map(item => ({ ...item, is_delete: false }));

  const Wheel_detail_total_value = sumTotalValueWheelDetail(listData)

  const dataObject = {
    'listData': listData,
    'wheel_curt_value': data.data.wheel_curt_value,
    'wheel_total_value': data.data.wheel_total_value,
    'Wheel_detail_total_value': Wheel_detail_total_value,
    'no': no,
  }

  dispatch(setSearchWheelDetail(dataObject))
  dispatch(setDataCheckWheel({
    'num_segment_wheel': data.data.num_segment_wheel,
    'wheel_status': data.data.wheel_status
  }))
  return dataObject
}

export const searchWheelDetailById = (payload) => async (dispatch, getState, { $http }) => {
  let param = {
    'segment_id': payload.segment_id ? payload.segment_id : null,
    'wheel_name': payload.wheel_name ? payload.wheel_name : null
  }
  let fillterData = []
  let state = getState()
  let listWheelDetail = [...state.wheeldetail.listWheelDetail]
  if (!param.segment_id && !param.wheel_name) {
    fillterData = [...state.wheeldetail.listWheelDetail]
  } else {
    for (let i = 0; i < listWheelDetail.length; i++) {
      if (param.segment_id && !param.wheel_name) {
        if (listWheelDetail[i].segment_id === param.segment_id) {
          fillterData.push(listWheelDetail[i])
        }
      } else if (!param.segment_id && param.wheel_name) {
        if (listWheelDetail[i].wheel_name.includes(param.wheel_name)) {
          fillterData.push(listWheelDetail[i])
        }
      } else if (param.segment_id && param.wheel_name) {
        if (listWheelDetail[i].segment_id === param.segment_id) {
          if (listWheelDetail[i].wheel_name.includes(param.wheel_name)) {
            fillterData.push(listWheelDetail[i])
          }
        }
      }
    }
  }
  const { listData } = resultDoneWheelDetail(fillterData);
  return listData
}


// sắp xết data và kiem tra data wheeldetail
function resultDoneWheelDetail(data) {
  // kiem tra stt có tồn tại trong dataList.no, thì thêm 1 trường isDuplicate true/false
  let dataList = data
  let dataListDeleted = [];
  let dataListNoDeleted = []

  // cho tất cã data thành không trùng nhau về STT : false. lập ra 2 arr item đã xóa và item chưa xóa
  for (let i = 0; i < dataList.length; i++) {
    dataList[i].is_duplicated = false;
    dataList[i].is_lengthExceeded = false;
    if (dataList[i].is_delete) {
      dataListDeleted.push(dataList[i])
    } else {
      dataListNoDeleted.push(dataList[i])
    }
  }
  const no = dataListNoDeleted.length
  // Tìm các phần tử data trùng nhau của data chua xóa
  for (let i = 0; i < dataListNoDeleted.length; i++) {
    // dataList.includes(dataList.no)
    for (let j = 0; j < dataListNoDeleted.length; j++) {
      if (i !== j && dataListNoDeleted[i].no === dataListNoDeleted[j].no) {
        dataListNoDeleted[i].is_duplicated = true;
      }
    }
    // kiem tra stt của phần tử có dài hơn dataListNoDeleted.length
    if (dataListNoDeleted[i].no > dataListNoDeleted.length) {
      dataListNoDeleted[i].is_lengthExceeded = true
    }
  }
  // sắp xếp thứ tự tứ bé đến lớn stt,
  let dataResult = dataListNoDeleted.sort(function (a, b) {
    return a.no - b.no
  }).concat(dataListDeleted).map((item, index) => ({ ...item, key: index }))
  return {
    'listData': dataResult,
    'no': no
  }
  // return dataResult
}

// total value all wheell_Detail
function sumTotalValueWheelDetail(data) {
  let dataList = data;
  let total = 0;
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i].is_delete === false) {
      total += parseInt(dataList[i].remain_value)
      // (parseInt(dataList[i].remain_value) * parseInt(dataList[i].remain_number))
    }
  }
  return parseInt(total)
}





