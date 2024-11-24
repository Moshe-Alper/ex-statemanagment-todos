const { createStore, compose } = Redux

import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"

//* Todos
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_DONE_TODOS_PERCENT = 'SET_DONE_TODOS_PERCENT'

// Loading
export const SET_LOADING = 'SET_LOADING'

// Filtering
export const SET_FILTER_BY = 'SET_FILTER_BY'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: todoService.getDefaultFilter(),
    loggedInUser: userService.getLoggedinUser(),
    doneTodosPercent: 0,
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

        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }

        case SET_USER_BALANCE:
            if (!state.user) return state
            return { 
                ...state, 
                user: { ...state.user, balance: cmd.balance } 
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