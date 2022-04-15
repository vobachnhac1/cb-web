import * as TYPES from './type';
import URLSERVER from '@/redux/urlServer.json';

// hàm thị thi nội bộ
const setSearchWheelDetail = (payload) => ({ type: TYPES.WHEELDETAIL_SEARCH, payload });
// hàm xử lý được gọi từ bên ngoài
export const searchWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": 0,
    "wheel_detail_id": 0,
    "segment_id": 0,
    "no": 0,
    "goal_yn": 0,
    "remain_value": 0,
    "inactived_date": "2022-04-11T06:06:50.653Z",
    "created_date": "2022-04-11T06:06:50.653Z",
    "datelastmaint": "2022-04-11T06:06:50.653Z",
    "is_approve": true
  }
  // call xuống backend url + param 
  const result = await $http.post(URLSERVER.searchAllWheelDetail, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listWheelDetail = data.data; 0
  dispatch(setSearchWheelDetail(listWheelDetail))
  return true
}

export const insertWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_id": parseInt(payload.wheel_id),
    "wheel_detail_id": parseInt(payload.wheel_detail_id),
    "segment_id": parseInt(payload.segment_id),
    "no": parseInt(payload.no),
    "goal_yn": parseInt(payload.goal_yn),
    "remain_value": parseInt(payload.remain_value),
    "inactived_date": "2022-04-13T08:32:30.059Z",
    "created_date": "2022-04-13T08:32:30.059Z",
    "datelastmaint": "2022-04-13T08:32:30.059Z",
    "is_approve": true
  }
  // // call xuống backend url + param 
  // const result = await $http.post(URLSERVER.insertWheelDetail, param);
  // // console.log('call action create insert WheelDetail', result)
  // const { success, data } = result;
  // if (!success || !data.success) {
  //   return false;
  // }
  let state = getState()
  let listWheelDetail = [...state.wheeldetail.listWheelDetail]
  listWheelDetail.push(param)
  const listData = resultDoneWheelDetail(listWheelDetail);
  dispatch(setSearchWheelDetail(listData))

  return true
}

export const updateWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheel_detail_id": payload.wheel_detail_id,
    "no": payload.no,
    "goal_yn": payload.goal_yn,
    "remain_value": payload.remain_value,
  }
  console.log('payload', payload)
  // call xuống backend url + param 
  // const result = await $http.post(URLSERVER.updateWheelDetailById, param);
  // Wheeldetail_id 
  let state = getState()
  let listWheelDetail = [...state.wheeldetail.listWheelDetail]

  for (let i = 0; i < listWheelDetail.length; i++) {
    if (listWheelDetail[i].wheel_detail_id === param.wheel_detail_id) {
      listWheelDetail[i].no = param.no
      listWheelDetail[i].goal_yn = param.goal_yn
      listWheelDetail[i].remain_value = param.remain_value
    }
  }

  const listData = resultDoneWheelDetail(listWheelDetail);

  dispatch(setSearchWheelDetail(listData))

  return true
}

export const deleteWheelDetailById = (payload) => async (dispatch, getState, { $http }) => {
  const param = {
    "wheeldetail_id": payload.wheeldetail_id,
  }
  let state = getState()
  let listWheelDetail = [...state.wheeldetail.listWheelDetail]
  for (let i = 0; i < listWheelDetail.length; i++) {
    if (listWheelDetail[i].wheeldetail_id === param.wheeldetail_id) {
      listWheelDetail.splice(i, 1)
      break
    }
  }
  const listData = resultDoneWheelDetail(listWheelDetail);

  dispatch(setSearchWheelDetail(listData))
  // arr.splice(index, 1);
  // call xuống backend url + param 
  // const result = await $http.post(URLSERVER.deleteWheelDetailById, param);
  // const { success, data } = result;
  // if (!success || !data.success) {
  //   return false;
  // }
  return true
}

// function swap(arr,indexA, indexB) {
//   var temp = a;
//   a = b;
//   b = temp;

// }


export const upOutData = (payload) => async (dispatch, getState, { $http }) => {
  // payload, nhan wheeldetail_id,listData
  let wheeldetail_id = payload.wheeldetail_id
  const listData = payload.listWheelDetail;
  for (let i = 0; i < listData.length; i++) {
    // get vi vi wheeldetail_id nam trong data;
    if (listData[i].wheeldetail_id === wheeldetail_id) {
      // swap(listData[i], listData[i-1])
      let temp = listData[i];
      listData[i] = listData[i - 1];
      listData[i - 1] = temp
    }
  }
  dispatch(setSearchWheelDetail(listData))
  // get lisst vao state


}

export const downOutData = (payload) => async (dispatch, getState, { $http }) => {
  // payload, nhan wheeldetail_id,
  let wheeldetail_id = payload.wheeldetail_id
  const listData = payload.listWheelDetail;

  for (let i = 0; i < listData.length; i++) {
    // get vi vi wheeldetail_id nam trong data;
    if (listData[i].wheeldetail_id === wheeldetail_id) {
      // swap(listData[i], listData[i + 1])
      let temp = listData[i];
      listData[i] = listData[i + 1];
      listData[i + 1] = temp
    }
  }
  dispatch(setSearchWheelDetail(listData))

}

export const filterWheelDetail = (payload) => async (dispatch, getState, { $http }) => {
  let param = {
    "wheel_id": payload.wheel_id ? parseInt(payload.wheel_id) : null,
    "wheel_detail_id": payload.wheel_detail_id ? parseInt(payload.wheel_detail_id) : null,
    "segment_id": payload.segment_id ? parseInt(payload.segment_id) : null,
    "no": payload.no ? parseInt(payload.no) : null,
    "goal_yn": payload.goal_yn ? parseInt(payload.goal_yn) : null,
    "remain_value": payload.remain_value ? parseInt(payload.remain_value) : null,
    "inactived_date": null,
    "created_date": null,
    "datelastmaint": null,
    "is_approve": true
  }
  const result = await $http.post(URLSERVER.searchWheelDetailById, param);
  const { success, data } = result;
  if (!success || !data.success) {
    return false;
  }
  const listData = resultDoneWheelDetail(data.data);

  dispatch(setSearchWheelDetail(listData))
  return true
}

function resultDoneWheelDetail(data) {
  // kiem tra stt có tồn tại trong dataList.no, thì thêm 1 trường isDuplicate true/false
  let dataList = data
  for (let i = 0; i < dataList.length; i++) {
    dataList[i].is_duplicated = false;
  }

  for (let i = 0; i < dataList.length; i++) {
    // dataList.includes(dataList.no)
    for (let j = 0; j < dataList.length; j++) {
      if (i !== j && dataList[i].no === dataList[j].no) {
        dataList[i].is_duplicated = true;
      }
    }
  }
  const dataResult = dataList.sort(function (a, b) { return a.no - b.no })
  return dataResult
}

// function export ra ngoài

