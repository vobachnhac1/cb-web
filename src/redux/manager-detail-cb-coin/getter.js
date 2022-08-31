// Lấy giá trị store

export const getStateLoadPageSegment = ({ ManagerDetailCbCoin: { listManagerDetailCbCoin = [] } }) => {
  return listManagerDetailCbCoin.map((item, index) => ({ ...item, key: index })) || []
};


/// lấy state
