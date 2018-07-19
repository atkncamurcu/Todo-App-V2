import { 
    LOGIN_PASSWORD_CHANGE, 
    LOGIN_EMAIL_CHANGE, 
    LOGIN_SUCCESS } 
    from "../type";


const INITIAL_STATE = {
    loading: false,
    login_email: undefined,
    login_pass: undefined,
}

export default(state = INITIAL_STATE,action) => {
    switch(action.type){

        case LOGIN_SUCCESS:
            return INITIAL_STATE;

        case LOGIN_PASSWORD_CHANGE:
            return { ...state, login_pass: action.payload };    

        case LOGIN_EMAIL_CHANGE:
            return { ...state, login_email: action.payload };

        default :
            return state;
    }
}