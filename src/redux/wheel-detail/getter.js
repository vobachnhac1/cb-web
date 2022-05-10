
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
export const getStateWheelDetialNo = ({ wheeldetail: { no } }) => {
  return no ? no : 0
};
export const getStateWheelNumbersegment = ({ wheeldetail: { num_segment_wheel } }) => {
  return num_segment_wheel ? num_segment_wheel : 0
};
export const getStateWheelStatus = ({ wheeldetail: { wheel_status } }) => {
  return wheel_status ? wheel_status : ''
};






/// lấy state
