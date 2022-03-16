
import * as TYPES from './type';

const INIT_STATE = {
    init_loading: false,
    locale: null,
};

const globalReducer = (state, {type , payload}) =>{
    switch (action.type) {
        case [TYPES.HOME_INIT]:
            console.log("loading page");
            break;
        default:
    return { ...state };
    };

}
export default globalReducer;
