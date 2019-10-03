import React from 'react'

class Portfolio extends React.Component {

    componentDidMount() {
        fetch(`http://localhost:3000/userstocks`, {
            method: "POST", 
            body: JSON.stringify({id:1}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then( res => res.json())
        .then( res => {
            console.log(res)
        })
    }

    render() {
        return(
            <h1>Portfolio</h1>
        )
    }
}

export default Portfolio