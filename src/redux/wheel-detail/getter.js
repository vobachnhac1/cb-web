
// Lấy giá trị store

export const getStateLoadPageWheelDetail = ({ wheeldetail: { listWheelDetail } }) => {
  return listWheelDetail.map((item, index) => ({ ...item, key: index })) || []
};


/// lấy state
