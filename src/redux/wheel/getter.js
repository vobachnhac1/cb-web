// Lấy giá trị store

export const getStateLoadPageWheel = ({ wheel: { listWheel = [] } }) => {
  return listWheel.map((item, index) => ({ ...item, key: index })) || []
};


/// lấy state
