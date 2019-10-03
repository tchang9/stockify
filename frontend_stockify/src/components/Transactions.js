import React from 'react'
import v4 from 'uuid'
import Nav from './Nav'

class Transactions extends React.Component {
    state = {
        transactions: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/transactions`, {
            headers:{
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
            }
        })
        .then( res => res.json())
        .then( res => {
            this.setState({
                transactions: [...res]
            })
        })
    }

    renderTransactions = () => {
        return this.state.transactions.map(t => {
            
            return <div key = { v4() }>{t.action} ({t.stock_ticker})  {t.quantity} Shares @ {t.price}</div>
        })
    }
    render() {
        console.log(this.state)
        return(
            <>
                <Nav />
                <h1>Transactions</h1>
                    {this.state.transactions.length === 0 ? "No Transactions" : this.renderTransactions()}
            </>
        )
    }
}

export default Transactions