// Lấy giá trị store

export const getStateLoadPageSegment = ({ segment: { listSegment = [] } }) => {
  return listSegment?.map((item, index) => ({ ...item, key: index })) || []
};

export const getPagination = (state) => {
  const { segment: { pagination = [] } } = state;
  return pagination || []
};

/// lấy state
