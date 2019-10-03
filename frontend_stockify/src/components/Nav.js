import React from 'react'
import { withRouter } from 'react-router-dom'

const Nav = (props) => {

    const handleClick = (e) => {
        props.history.push(`${e.target.innerText}`)
    }

    return (
        <>
            <div onClick={handleClick}>
                Portfolio
            </div>
            <div onClick={handleClick}>Transactions</div>
        </>
    )
}

export default (withRouter(Nav))