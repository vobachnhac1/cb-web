// Lấy giá trị store

export const getStateLoadPageTopic = (state) => {
  const { topic: { listTopic } } = state;
  console.log('PageTopic state: ', state);
  return listTopic.map((item, index) => ({ ...item, key: index })) || []
};

/// lấy state
