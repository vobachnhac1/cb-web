
import * as TYPES from './type';

const setLoadingPage          = payload => ({ type: TYPES.HOME_INIT, payload });

export const initPage = () => (dispatch, getState, { $http })=>{
    dispatch( setLoadingPage(true));
}