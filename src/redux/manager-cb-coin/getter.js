// Lấy giá trị store

export const getStateLoadPageManagerCbCoin = ({ ManagerCbCoin: { listManagerCbCoin = [] } }) => {
  return listManagerCbCoin.map((item, index) => ({ ...item, key: index })) || []
};


/// lấy state
