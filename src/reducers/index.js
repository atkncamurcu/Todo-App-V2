import LoginReducer from './login'
import RegisterReducer from './register'
import TodoReducer from './todo'
import { combineReducers } from 'redux';

export default combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
    todo: TodoReducer
})