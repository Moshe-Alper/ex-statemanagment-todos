import { todoService } from "../../services/todo.service.js";
import { SET_TODOS, REMOVE_TODO, UPDATE_TODO, SET_LOADING, SET_FILTER_BY, store } from "../store.js";

export function loadTodos(filterSort) {
    
    store.dispatch({ type: SET_LOADING, isLoading: true })
    return todoService.query(filterSort)
    .then(todos => {
            store.dispatch({ type: SET_TODOS, todos})
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_LOADING, isLoading: false })
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

export function setFilterSort(filterBy) {
    const cmd = {
        type: SET_FILTER_BY,
        filterBy,
    }
    store.dispatch(cmd)
}