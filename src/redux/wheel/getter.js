// Lấy giá trị store

export const getStateLoadPageTopic = ({ topic: { listTopic } }) => {
  return listTopic.map((item, index) => ({ ...item, key: index })) || []
};

/// lấy state
