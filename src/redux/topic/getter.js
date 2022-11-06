// Lấy giá trị store

export const getStateLoadPageTopic = (state) => {
  const { topic: { listTopic = [] } } = state;
  return listTopic?.map((item, index) => ({ ...item, key: index })) || []
};


export const getPagination = (state) => {
  const { topic: { pagination = [] } } = state;
  return pagination || []
};
/// lấy state
