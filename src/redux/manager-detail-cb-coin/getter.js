// Lấy giá trị store

export const getStateLoadPageManagerDetailCbCoin = ({ ManagerDetailCbCoin: { listManagerDetailCbCoin = [] } }) => {
  return listManagerDetailCbCoin?.map((item, index) => ({ ...item, key: index })) || []
};


/// lấy state
