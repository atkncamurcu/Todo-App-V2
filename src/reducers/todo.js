import {
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    ADD_TODO_CHANGE,
    LOAD_TODOS,
    TODOS_LIST_LOADING,
    TODOS_LIST_READY,
    CHANGE_NEW_TODO_DATE
} from '../type'

const INITIAL_STATE = {
    loading: false,
    todoList: [] ,
    new_todo: '',
    new_date: 0,
}

export default(state = INITIAL_STATE,action) => {
    switch(action.type){
        case CHANGE_NEW_TODO_DATE:
            return { ...state, new_date: action.payload };
        case TODOS_LIST_LOADING: 
            return { ...state, loading: true };
        case TODOS_LIST_READY: 
            return { ...state, loading: false };

        case ADD_TODO:
            return {...state, todoList:[ ...state.todoList, action.payload ]};

        case DELETE_TODO:
            return {...state, todoList: action.payload };

        case EDIT_TODO:
            return {...state, todoList: action.payload };

        case ADD_TODO_CHANGE:
            return {...state,new_todo: action.payload};
            
        case LOAD_TODOS:
            return { ...state, todoList: action.payload, loading: false };

        default :
            return state;
    }
}