const { createStore, compose } = Redux

import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"

//* Todos
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

// Loading
export const SET_LOADING = 'SET_LOADING'

// Filtering
export const SET_FILTER_BY = 'SET_FILTER_BY'

//* User
export const SET_USER = 'SET_USER'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: todoService.getDefaultFilter(),
    loggedInUser: userService.getLoggedinUser(),
}

function appReducer(state = initialState, cmd = {}) {
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

        //* Loading
        case SET_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        //* Filtering
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }

        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }

        default:
            return state
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

// For Debugging
window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })