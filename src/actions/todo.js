import { 
    ADD_TODO,
    DELETE_TODO,
    EDIT_TODO,
    ADD_TODO_CHANGE, 
    LOAD_TODOS, 
    TODOS_LIST_LOADING, 
    CHANGE_NEW_TODO_DATE
} from '../type';
import firebase from 'firebase';


export const AddTodo = ({ text, label, date }) => {
    return(dispatch) => {

        const newTodo = {}

        const userID = firebase.auth().currentUser.uid;

        newTodo.text = text;
        newTodo.label = label ? label : '';
        newTodo.date = date;

        firebase.database().ref('/users/' + userID + '/todos/').push(newTodo).then(res => {

            console.log(res);
            newTodo.id = res.path.pieces_[3];
            console.log(newTodo);
            dispatch({
                type: ADD_TODO,
                payload: newTodo
            });

        }).catch(e => {
            console.log(e);
        });
    }
}

export const DeleteTodo = (id) => {
    return (dispatch, getState) => {

        const userID = firebase.auth().currentUser.uid;
        const allTodos = getState().todo.todoList;
        const filteredTodos = allTodos.filter(todo => {
            if(todo.id === id) return false;
            else return true;
          
        });

        firebase.database().ref('/users/' + userID + '/todos/' + id)
        .remove()
        .then(() => {
            dispatch({
                type: DELETE_TODO,
                payload: filteredTodos
            });
        });
    }
}

export const EditTodo = ({ id, text, label, date}) => {
    return (dispatch, getState) => {

        const editTodo = {}
        editTodo.id = id;
        editTodo.text = text;
        editTodo.label = label ? label : '';
        editTodo.date = date;

        console.log(editTodo)

        const userID = firebase.auth().currentUser.uid;
        const allTodos = getState().todo.todoList;
        const filteredTodos = allTodos.filter(todo => {
            if(todo.id === id) return false;
            else return true;
        })

        firebase.database().ref('/users/' + userID + '/todos/' + id).
        set(editTodo)
        .then(() =>{
            dispatch({
                type: EDIT_TODO,
                payload: [ ...filteredTodos, editTodo]
            })
        })
    }
}

export const OnAddTodoChange = (text) => {
    return (dispatch) => {
        dispatch({
            type: ADD_TODO_CHANGE,
            payload: text
        })
    }
};

export const LoadInitialTodos = () => {
    return async(dispatch) => {

        dispatch({ type: TODOS_LIST_LOADING });

        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + uid + '/todos').once('value', todos => {

            const loadedTodos = [];

            todos.forEach(todo => {
                console.log(todo);
                loadedTodos.push({ ...todo.val(), id: todo.key });

            });

            dispatch({
                type: LOAD_TODOS,
                payload: loadedTodos
            }); 
        });

    }
}

export const OnChangeNewTodoDate = (e) => (dispatch => dispatch({ type: CHANGE_NEW_TODO_DATE, payload: e }))

