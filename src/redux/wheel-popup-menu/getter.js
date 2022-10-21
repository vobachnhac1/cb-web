// lay data

export const getStateListReward = ({ wheelPopupMenu: { listReward = [] } }) => {

  return listReward?.map((item, index) => ({ ...item, key: index })) || []
};

export const getStateListWheelDetailById = ({ wheelPopupMenu: { listWheelDetailById = [] } }) => {

  return listWheelDetailById?.map((item, index) => ({ ...item, key: index })) || []
};

export const getStateListCustomer = ({ wheelPopupMenu: { listCustomer = [] } }) => {

  return listCustomer?.map((item, index) => ({ ...item, key: index })) || []
};




/// lấy state

// listReward: [],
// listWheelDetailById: [],
// listCustomer: [],

// getStateListReward
// getStateListWheelDetailById
// getStateListCustomer

// listWheelDetailById: { listWheelDetailById = [] },
// listCustomer: { listCustomer = [] } }) => {