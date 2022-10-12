// Lấy giá trị store

export const getPathsFEList = ({ system: state }) => {
  return state.PathsFEList || null;
};

export const getPathsBEList = ({ system: state }) => {
  return state.PathsBEList || null;
};

export const getRolesList = ({ system: state }) => {
  return state.RolesList || null;
};

export const getAccountList = ({ system: state }) => {
  return state.AccountList || null;
};

export const getSystemList = ({ system: state }) => {
  return state.SystemList || null;
};

