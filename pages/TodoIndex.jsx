const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector } = ReactRedux

import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, setfilterBy, saveTodo } from "../store/actions/todo.actions.js"
import { changeBalance } from '../store/actions/user.actions.js'
import { LoaderWrapper } from "../cmps/LoaderWrapper.jsx"

export function TodoIndex() {
    const todos = useSelector(storeState => storeState.todos)
    const isLoading = useSelector(storeState => storeState.isLoading)
    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)
    const filterBy = useSelector((storeState) => storeState.filterBy)


    useEffect(() => {
        onSetfilterBy({ ...defaultFilter })
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

    function onSetfilterBy(filterBy) {
        setfilterBy({ ...filterBy })
    }

    return (
        <section className="todo-index">
            <TodoFilter filterBy={defaultFilter} onSetFilterBy={onSetfilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <LoaderWrapper isLoading={isLoading} />
                <TodoList todos={todos}
                    onRemoveTodo={onRemoveTodo}
                    onToggleTodo={onToggleTodo} />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>

        </section>
    )
}