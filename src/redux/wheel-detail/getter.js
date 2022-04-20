
// Lấy giá trị store

export const getStateLoadPageWheelDetail = ({ wheeldetail: { listWheelDetail = [] } }) => {
  return listWheelDetail
};

export const getStateWheelCurtValue = ({ wheeldetail: { wheelCurtValue } }) => {
  return wheelCurtValue ? wheelCurtValue : 0
};

export const getStateWheelTotalValue = ({ wheeldetail: { wheelTotalValue } }) => {
  return wheelTotalValue ? wheelTotalValue : 0
};

export const getStateWheelDetialTotalValue = ({ wheeldetail: { wheelDetialTotalValue } }) => {
  return wheelDetialTotalValue ? wheelDetialTotalValue : 0
};





/// lấy state
