import {LOGIN_SUCCESS} from '../type';

import fireabase from 'firebase';

const INITIAL_STATE = {
    email: undefined,
    loading: undefined,
    name: undefined,
    photo: undefined
}

export default(state = INITIAL_STATE,action) => {
    switch(action.type){
        case LOGIN_SUCCESS :
            return INITIAL_STATE;

        default : 
            return state

    }

}