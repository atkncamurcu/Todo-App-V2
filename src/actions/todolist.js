import {
    ADD_TODO_LIST,
    DELETE_TODO_LIST,
    UPDATE_TODO_LIST,
    TODO_LIST_CHANGE,
    LOAD_TODOLISTS,
    TODOLISTS_LOADING
} from '../type';

import firebase from 'firebase';

export const AddTodoList = ({ title }) => {
    return (dispatch) => {

        const newTodoList = {}
        
        const userID = firebase.auth().currentUser.uid;

        newTodoList.title = title;

        firebase.database().ref('/users/' + userID + '/lists/').push(newTodoList)
        .then(res => {
            newTodoList.id = res.path.pieces_[3];
            console.log(newTodoList)
            dispatch({
                type: ADD_TODO_LIST,
                payload: newTodoList
            });
        }).catch(e => {
            console.log(e)
        });

    }

}


export const DeleteTodoList = (id) => {
    return (dispatch,getState) => {
        const userID = firebase.auth().currentUser.uid;
        const allTodoList = getState().todolist.todoLists;
        const filteredTodoLists = allTodoList.filter(todolist => {
            if(todolist.id === id) return false;
            else return true;
        });

        firebase.database().ref('/users/' + userID + '/lists/' + id)
        .remove()
        .then(() => {
            dispatch({
                type: DELETE_TODO_LIST,
                payload: filteredTodoLists
            });
        });
    }
}


export const UpdateTodoList = ({ id, title}) => {
    return(dispatch,getState) => {

        const updateTodoList = {}
        updateTodoList.id = id;
        updateTodoList.title = title;

        const userID = firebase.auth().currentUser.uid;
        const allTodoList = getState().todolist.todoLists;
        const filteredTodoLists = allTodoList.filter(todolist => {
            if(todolist.id === id) return false;
            else return true;
        });

        firebase.database().ref('/users/' + userID + '/lists/' + id).
        set(updateTodoList)
        .then(() =>{
            dispatch({
                type: UPDATE_TODO_LIST,
                payload: [ ...filteredTodoLists, editTodo]
            })
        })
    }
}

export const OnTodoListChange = (title) => {
    return (dispatch) => {
        dispatch({
            type: TODO_LIST_CHANGE,
            payload: title
        })
    }
};



export const LoadInitialTodoLists = () => {
    return async(dispatch) => {

        dispatch({ type: TODOLISTS_LOADING });

        const userID = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + userID + '/lists').once('value', todoLists => {

            const loadedTodoLists = [];

            todoLists.forEach(todoList => {
    
                const listsTodos = [];
                if(todoList.val().todos){
                    const thisObject = todoList.val().todos;
                    Object.keys(thisObject).forEach(val => {
                        console.log(thisObject[val], val);
                        listsTodos.push({ ...thisObject[val], id: val });
                    });
                }
                loadedTodoLists.push({ ...todoList.val(), id: todoList.key, todos: listsTodos });

            });
            //console.log(loadedTodoLists);

            dispatch({
                type: LOAD_TODOLISTS,
                payload: loadedTodoLists
            }); 
        });

    }
}