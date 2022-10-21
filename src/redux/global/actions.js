import * as TYPES from './type';

// hàm thị thi nội bộ
const loginAdminDispatch = (payload) => ({
  type: TYPES.SIGN_IN,
  payload
})

const signOutDispatch = () => ({ type: TYPES.SIGN_OUT})


export const loginAdmin = (payload) => async (dispatch, getState, { $http }) => {
  const result = await $http.post('/local/signin', {
    
    ...payload
  })
  if(result.success){
    const {data}=result
    const access_token = result?.data?.accessToken.access_token;
    $http.setAccessToken(access_token)
    const param = {
      accessToken: access_token,
      arrPaths: data.arrPaths,
      userProfile: data.userProfile,
    }
    dispatch(loginAdminDispatch(param))
  }
  const state = getState()

  return true;
}

export const SignOut = () => async (dispatch, getState, { $http }) => {
  dispatch(signOutDispatch());
}
// function export ra ngoài

