// Lấy giá trị store

export const getStateLoadPageRules = (state) => {
  const { rules: { listRules = [] } } = state;
  return listRules.map((item, index) => ({ ...item, key: index })) || []
};

export const getListWheelApproved = (state) => {
  const { rules: data } = state;
  const { listWheelApproved } = data;
  if (listWheelApproved.length == 0) return [];
  return listWheelApproved.map((item, index) => ({ ...item, key: index })) || []
};
// export const getListWheelDetail = (state) => {
//   const { rules: data } = state;
//   const { listWheelDetail } = data;
//   if (listWheelDetail.length == 0) return [];
//   return listWheelDetail.map((item, index) => ({ ...item, key: index })) || []
// };
/// lấy state
