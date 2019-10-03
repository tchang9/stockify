import React from 'react'
import { withRouter } from 'react-router-dom'

const Nav = (props) => {

    const handleClick = (e) => {
        props.history.push(`${e.target.innerText}`)
    }

    const logout = () => {
        localStorage.removeItem("token")
        props.history.push('/')
    }

    return (
        <div className="nav">
            <button onClick={handleClick}>Portfolio</button>
            <button onClick={handleClick}>Transactions</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default (withRouter(Nav))
