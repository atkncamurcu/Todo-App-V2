import LoginReducer from './login'
import RegisterReducer from './register'
import TodoReducer from './todo'
import TodoListReducer from './todolist'
import { combineReducers } from 'redux';

export default combineReducers({
    login: LoginReducer,
    register: RegisterReducer,
    todo: TodoReducer,
    todolist: TodoListReducer
})