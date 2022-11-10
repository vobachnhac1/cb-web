// Lấy giá trị store

export const getStateLoadPageWheel = ({ wheel: { listWheel = [] } }) => {
  return  listWheel?.map((item, index) => ({ ...item, key: index })) || []
};

export const getPagination = (state) => {
  const { wheel: { pagination = [] } } = state;
  return pagination || []
};

/// lấy state
