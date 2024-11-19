const { createStore } = Redux

import { userService } from "../services/user.service.js"

//* Todos
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

// Loading
export const SET_LOADING = 'SET_LOADING'

//* User
export const SET_USER = 'SET_USER'

const initialState = {
    todos: [],
    isLoading: false,
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

export const store = createStore(appReducer)
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})