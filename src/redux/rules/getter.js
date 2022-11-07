// Lấy giá trị store

export const getStateLoadPageRules = (state) => {
  const { rules: { listRules = [] } } = state;
  return listRules?.map((item, index) => ({ ...item, key: index })) || []
};

export const getRulesModal = (state) => {
  const { rules: { listRulesModal = [] } } = state;
  return listRulesModal?.map((item, index) => ({ ...item, key: index })) || []
};

export const getListRulesStateYes = (state) => {
  const { rules: { listRulesStateYes = [] } } = state;
  return listRulesStateYes?.map((item, index) => ({ ...item, key: index })) || []
};

export const getListWheelApproved = (state) => {
  const { rules: data } = state;
  const { listWheelApproved } = data;
  if (listWheelApproved?.length == 0) return [];
  return listWheelApproved?.map((item, index) => ({ ...item, key: index })) || []
};
export const getListWheel = (state) => {
  const { rules: data } = state;
  const { listWheel = [] } = data;
  if (listWheel?.length == 0) return [];
  return listWheel?.map((item, index) => ({ ...item, key: index })) || []
};
/// lấy state

export const getListRewardHis = (state) => {
  const { rules: data } = state;
  const { listRewardHis = [] } = data;
  if (listRewardHis?.length == 0) return [];
  return listRewardHis?.map((item, index) => ({ ...item, key: index })) || []
};