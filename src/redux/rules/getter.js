// Lấy giá trị store

export const getStateLoadPageRules = (state) => {
  const { rules: { listRules = [] } } = state;
  return listRules.map((item, index) => ({ ...item, key: index })) || []
};
/// lấy state
