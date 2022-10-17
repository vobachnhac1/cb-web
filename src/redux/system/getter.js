
// Lấy giá trị store

export const getPathsFEList = ({ system: state }) => {
  return state.PathsFEList?.map((item, index)=>({...item, key: index})) || null;

};

export const getPathsBEList = ({ system: state }) => {
  return state.PathsBEList?.map((item, index)=>({...item, key: index})) || null;
};

export const getRolesList = ({ system: state }) => {
  return state.RolesList?.map((item, index)=>({...item, key: index})) || null;

};

export const getAccountList = ({ system: state }) => {
  return state.AccountList?.map((item, index)=>({...item, key: index})) || null;

};

export const getSystemList = ({ system: state }) => {
  return state.SystemList?.map((item, index)=>({...item, key: index})) || null;

};

export const dropdownSysList = ({ system: state }) => {
  return state?.SystemList?.map((item, index)=>({
    key: index,
    sysCode: item.sysCode,
    sysName: item.sysName,
    id: item.id,
  }
  )) || null;
};


export const dropdownRoleList = ({ system: state }) => {
  return state?.RolesList?.map((item, index)=>({
    key: index,
    roleId: item.roleId,
    roleName: item.roleName
  }
  )) || null;
};

