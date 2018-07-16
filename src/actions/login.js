import { LOGIN_EMAIL_CHANGE,LOGIN_PASSWORD_CHANGE } from "../type";

import firebase from "firebase";

export const OnEmailChange = (email) => {
    return (dispatch) => {

        dispatch({
            type: LOGIN_EMAIL_CHANGE,
            payload: email
        })
    }
};



export const OnLoginRequest = (email, password) => {
    return(dispatch) => {
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email,password)
        .then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e);
        })

    }
}


export const OnPasswordChange = (password) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_PASSWORD_CHANGE,
            payload: password
        })
    }
};