// Lấy giá trị store

export const getStateLoadPageSegment = ({ segment: { listSegment = [] } }) => {
  return listSegment?.map((item, index) => ({ ...item, key: index })) || []
};
export const getSegmentCommon = ({ segment: { listSegmentCommon = [] } }) => {
  return listSegmentCommon?.map((item, index) => ({ ...item, key: index })) || []
};

export const getPagination = (state) => {
  const { segment: { pagination = {} } } = state;
  return pagination || {
    total_item: 0,
    num_page: 0,
    item_page: 20,
    current_page: 1,
  }
};

/// lấy state
