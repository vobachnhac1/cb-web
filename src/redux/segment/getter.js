// Lấy giá trị store

export const getStateLoadPageSegment = ({ segment: { listSegment = [] } }) => {
  return listSegment?.map((item, index) => ({ ...item, key: index })) || []
};


/// lấy state
