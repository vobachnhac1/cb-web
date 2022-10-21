// Lấy giá trị store

export const getAccessToken = ({ global: state }) => {
  return state?.access_token ? true : false
};

export const getProfile = ({ global: state }) => {
  return state?.userProfile || null
};

export const getPermissionPath = ({ global: state }) => {
  return state?.arrPaths || null 
};
/// lấy state
