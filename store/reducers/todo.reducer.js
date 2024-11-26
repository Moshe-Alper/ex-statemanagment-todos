import { todoService } from "../../services/todo.service.js"

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_DONE_TODOS_PERCENT = 'SET_DONE_TODOS_PERCENT'
// Loading
export const SET_LOADING = 'SET_LOADING'
// Filtering
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: todoService.getDefaultFilter(),
    doneTodosPercent: 0,
}

export function todoReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        //* Todos
        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, cmd.todo]
            }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => todo._id === cmd.todo._id ? cmd.todo : todo)
            }

        case SET_DONE_TODOS_PERCENT:
            return { ...state, doneTodosPercent: cmd.doneTodosPercent }

        //* Filtering
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }

        //* Loading
        case SET_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        default:
            return state
    }
}
