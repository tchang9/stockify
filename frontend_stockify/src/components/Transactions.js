import React from 'react'
import v4 from 'uuid'
import Nav from './Nav'

class Transactions extends React.Component {
    state = {
        transactions: []
    }

    componentDidMount() {
        fetch(`https://stockify-api.herokuapp.com/transactions`, {
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
            
            return <div key = { v4() }>{t.action.toUpperCase()} ({t.stock_ticker})  {t.quantity} Shares @ ${t.price}</div>
        })
    }

    render() {
        return(
            <>
                <Nav />
                <div className="transactions">
                    <h1>Transactions</h1>
                        {this.state.transactions.length === 0 ? "No Transactions" : this.renderTransactions()}
                </div>
            </>
        )
    }
}

export default Transactions
