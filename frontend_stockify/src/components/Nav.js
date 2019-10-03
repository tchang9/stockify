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
        <>
            <div onClick={handleClick}>
                Portfolio
            </div>
            <div onClick={handleClick}>Transactions</div>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default (withRouter(Nav))