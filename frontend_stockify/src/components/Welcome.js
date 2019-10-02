import React from 'react'
import { withRouter } from 'react-router'

const Welcome = (props) => {

    const handleClick = (e) => {
        const page = e.target.innerText.toLowerCase()
        return props.history.push(`/${page}`)

    }

    return(
        <>
            <h1>Stockify!!</h1>
            <button onClick={handleClick}>Login</button>
            <button onClick={handleClick}>Register</button>
        </>
    )
}

export default (withRouter(Welcome))