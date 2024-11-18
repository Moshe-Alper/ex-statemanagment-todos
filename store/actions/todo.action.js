import { todoService } from "../../services/todo.service.js";
import { SET_TODOS, store } from "../store.js";

export function loadTodos(filterBy) {

    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos})
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
}