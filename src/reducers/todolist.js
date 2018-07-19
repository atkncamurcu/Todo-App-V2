import {
    ADD_TODO_LIST,
    DELETE_TODO_LIST,
    UPDATE_TODO_LIST,
    LOAD_TODOLISTS,
    TODOLISTS_LOADING,
    TODO_LIST_CHANGE
} from '../type';


const INITIAL_STATE = {
    loading: false,
    todoLists: [] ,
    list_title: '',
}

export default(state= INITIAL_STATE,action) => {
    switch(action.type) {

        case ADD_TODO_LIST:
            return { ...state, todoLists:[ ...state.todoLists, action.payload]};

        case DELETE_TODO_LIST:
            return { ...state, todoLists: action.payload};

        case UPDATE_TODO_LIST:
            return { ...state, todoLists: action.payload};
        
        case TODO_LIST_CHANGE:
            return {...state,list_title: action.payload};
            
        case TODOLISTS_LOADING:
            return { ...state, loading: true };

        case LOAD_TODOLISTS:
            return { ...state, todoLists: action.payload, loading: false };

        default :
            return state;
    }
        
    
}

