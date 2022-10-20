// Lấy giá trị store

export const getStateLoadPageManagerCbCoin = ({ ManagerCbCoin: { listManagerCbCoin = [] } }) => {
  return listManagerCbCoin?.map((item, index) => ({ ...item, key: index })) || []
};



export const getStateLoadPageManagerCbCoinUserHistory = ({ ManagerCbCoin: { listManagerCbCoinUserHistory = [] } }) => {
  return listManagerCbCoinUserHistory?.map((item, index) => ({ ...item, key: index })) || []
};

export const getStateLoadPageManagerCbCoinHistory = ({ ManagerCbCoin: { listManagerCbCoinHistory = [] } }) => {
  return listManagerCbCoinHistory?.map((item, index) => ({ ...item, key: index })) || []
};

/// lấy state
