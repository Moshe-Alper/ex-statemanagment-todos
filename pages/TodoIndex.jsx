const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector } = ReactRedux

import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, setFilterBy, saveTodo } from "../store/actions/todo.actions.js"
import { changeBalance } from '../store/actions/user.actions.js'
import { LoaderWrapper } from "../cmps/LoaderWrapper.jsx"

export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
    const filterBy = useSelector((storeState) => storeState.todoModule.filterBy)


    useEffect(() => {
        onSetFilterBy({ ...defaultFilter })
    }, [])

    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(err => {
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

    function onRemoveTodo(todoId) {
        const isConfirmed = confirm(`Are you sure you want to remove this Todo?`)
        if (!isConfirmed) return
        removeTodo(todoId)
            .then(() => showSuccessMsg(`Todo removed`))
            .catch(err => {
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }

        saveTodo(todoToSave)
            .then(({ savedTodo }) => {
                showSuccessMsg(`Updated ${savedTodo.txt} successfully`)
                if (savedTodo.isDone) {
                    console.log('savedTodo.isDone:', savedTodo.isDone)
                    return changeBalance(10)
                }
            })
            .catch(() => showErrorMsg('Had trouble updating the todo'))
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }

    return (
        <section className="todo-index">
            <TodoFilter filterBy={defaultFilter} onSetFilterBy={onSetFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <LoaderWrapper isLoading={isLoading}>
            {todos.length ? (
                <TodoList
                    todos={todos}
                    onRemoveTodo={onRemoveTodo}
                    onToggleTodo={onToggleTodo}
                />
            ) : (
                <p>No todos to show...</p>
            )}
        </LoaderWrapper>
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>

        </section>
    )
}