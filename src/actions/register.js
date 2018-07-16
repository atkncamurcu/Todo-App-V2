import { REGISTER_EMAIL_CHANGE,REGISTER_PASSWORD_CHANGE,REGISTER_NAME_CHANGE } from "../type";

import firebase from "firebase";

export const OnRegisterEmailChange = (email) => {
    return (dispatch) => {

        dispatch({
            type: REGISTER_EMAIL_CHANGE,
            payload: email
        })
    }
};


export const OnRegisterPasswordChange = (password) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_PASSWORD_CHANGE,
            payload: password
        })
    }
};


export const OnRegisterNameChange = (name) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_NAME_CHANGE,
            payload: name
        })
    }
};

export const OnRegisterRequest = (email, password) => {
    return(dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e);
        })

    }
}