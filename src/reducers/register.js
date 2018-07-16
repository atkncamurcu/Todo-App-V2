import { REGISTER_PASSWORD_CHANGE, REGISTER_EMAIL_CHANGE, REGISTER_NAME_CHANGE, REGISTER_SUCCESS } from "../type";


const INITIAL_STATE = {
    loading: false,
    register_email: undefined,
    register_pass: undefined,
    register_name: undefined
}

export default(state = INITIAL_STATE,action) => {
    switch(action.type){
        case REGISTER_SUCCESS:
            return INITIAL_STATE;
        case REGISTER_PASSWORD_CHANGE:
            return { ...state, register_pass: action.payload };    
        case REGISTER_EMAIL_CHANGE:
            return { ...state, register_email: action.payload };
        case REGISTER_NAME_CHANGE:
            return {...state, register_name: action.payload};
        
        default :
            return state;
    }
}