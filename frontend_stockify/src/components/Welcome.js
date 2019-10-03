import React from 'react'
import { withRouter } from 'react-router'

const Welcome = (props) => {

    const handleClick = (e) => {
        const page = e.target.innerText.toLowerCase()
        return props.history.push(`/${page}`)
    }

    return(
        <div className="welcome">
            <h1>Stockify!!</h1>
            <div>
                <button onClick={handleClick}>Login</button>
                <button onClick={handleClick}>Register</button>
            </div>
        </div>
    )
}

export default (withRouter(Welcome))