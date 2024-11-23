const { useState } = React

const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'


export function AppHeader() {
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.loggedInUser)
    const todos = useSelector((storeState) => storeState.todos)
    const doneTodosPercent = useSelector((storeState) => storeState.doneTodosPercent)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout is successful')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function getStyleByUser() {
        const prefs = {
            color: '',
            backgroundColor: ''
        }

        if (user && user.pref) {
            prefs.color = user.pref.color
            prefs.backgroundColor = user.pref.bgColor
        }

        return prefs
    }

    const formattedPercent = todos ? doneTodosPercent.toFixed(2) + '%' : null

    return (
        <header style={getStyleByUser()} className="app-header full main-layout">
            <section className="header-container flex space-between align-center">
                <h1>React Todo App</h1>
    
                <nav className="app-nav flex align-center">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/user" >User profile</NavLink>
                </nav>
    
                <section className="user-info flex align-center">
                    {formattedPercent && (
                        <div className="progress-info flex align-center">
                            <div className="progress-circle">
                                {formattedPercent}
                            </div>
                            <span>Done Todos</span>
                        </div>
                    )}
                    {user ? (
                        <section className="user-actions flex align-center">
                            <Link to={`/user/${user._id}`}>Hello, {user.fullname}</Link>
                            <button onClick={onLogout}>Logout</button>
                        </section>
                    ) : (
                        <section className="user-login">
                            <LoginSignup />
                        </section>
                    )}
                </section>
                
            </section>
            <UserMsg />
        </header>
    )
}