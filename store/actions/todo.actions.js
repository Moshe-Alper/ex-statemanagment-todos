import { todoService } from "../../services/todo.service.js";
import { REMOVE_TODO, SET_DONE_TODOS_PERCENT, SET_FILTER_BY, SET_LOADING, SET_TODOS, UPDATE_TODO } from "../reducers/todo.reducer.js";

export function loadTodos() {
    const filterBy = store.getState().filterBy
    store.dispatch({ type: SET_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(({ todos, doneTodosPercent }) => {
            store.dispatch({
                type: SET_TODOS,
                todos
            })
            _setTodosData(doneTodosPercent)
            return todos
        })
        .catch(err => {
            console.error('Cannot load todos:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_LOADING, isLoading: false })
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(({ doneTodosPercent }) => {
            store.dispatch({
                type: REMOVE_TODO,
                todoId
            })
            _setTodosData(doneTodosPercent)
        })
        .then(() => addActivity('Removed the Todo: ' + todoId))
        .catch(err => {
            console.error('Cannot remove todo:', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = (todo._id) ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(({ doneTodosPercent, savedTodo }) => {
            store.dispatch({
                type, UPDATE_TODO,
                todo: savedTodo
            })
            _setTodosData(doneTodosPercent)
            return savedTodo
        })
        .catch(err => {
            console.error('Cannot save todo:', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    const cmd = {
        type: SET_FILTER_BY,
        filterBy,
    }
    store.dispatch(cmd)
}

function _setTodosData(doneTodosPercent) {
    store.dispatch({
        type: SET_DONE_TODOS_PERCENT,
        doneTodosPercent
    })

}