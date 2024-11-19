import { todoService } from "../../services/todo.service.js";
import { SET_TODOS, REMOVE_TODO, UPDATE_TODO, SET_LOADING, store } from "../store.js";

export function loadTodos(filterBy) {
    
    return todoService.query(filterBy)
    .then(todos => {
            store.dispatch({ type: SET_LOADING, isLoading: true })
            store.dispatch({ type: SET_TODOS, todos})
            store.dispatch({ type: SET_LOADING, isLoading: false })
        })
        .catch(err => {
            store.dispatch({ type: SET_LOADING, isLoading: false })
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}