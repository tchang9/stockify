import React from 'react'
import v4 from 'uuid'
import Nav from './Nav'

class Portfolio extends React.Component {

    state = {
        balance: 0,
        userStocks: {},
        buy: {
            ticker: "",
            quantity: 0
        },
        message: ""
    }

    componentDidMount() {
        const userId = localStorage.getItem("token")
        fetch(`http://localhost:3000/userstocks`, {
            method: "POST", 
            body: JSON.stringify({id:userId}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then( res => res.json())
        .then( res => {
            if (res.message) {
                this.setState({
                    message: res.message
                })
            } else {
                this.setState({
                    userStocks: {...res.transactions},
                    balance: res.balance
                })
            }
        })
    }

    renderStocks = () => {
        return Object.keys(this.state.userStocks).map(ticker => {
            const quantity = this.state.userStocks[ticker].quantity
            const price = parseFloat(this.state.userStocks[ticker].price).toFixed(2)
            return (
                <div key={ v4() }>{ticker} - {quantity} Shares          {(price * quantity).toFixed(2)}</div>
            )
        })
    }

    renderTotalStocks = () => {
        let total = 0
        for (const ticker in this.state.userStocks) {
            total += this.state.userStocks[ticker].quantity * parseFloat(this.state.userStocks[ticker].price).toFixed(2)
        }
        return total.toFixed(2)
    }

    handleChange = (e) => {
        this.setState({
            buy: {...this.state.buy, [e.target.name]: e.target.value}
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            message:""
        })
        fetch(`http://localhost:3000/buy`, {
            method: "POST", 
            body: JSON.stringify(this.state.buy),
            headers:{
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
            }
        })
        .then( res => res.json())
        .then( res => {
            if (res.message) {
                this.setState({
                    message: res.message
                })
            } else {
                let newStockTotal = res.quantity
                if (this.state.userStocks[res.stock_ticker]) {
                    newStockTotal += this.state.userStocks[res.stock_ticker].quantity
                }
                this.setState({
                    userStocks: {...this.state.userStocks,
                        [res.stock_ticker]: {
                            ...this.state.userStocks[res.stock_ticker],
                                quantity: newStockTotal,
                                price: res.price
                        }
                    },
                    balance: res.user.balance
                })
            }
        })
    }

    render() {
        return (
            <>
                <Nav />
                {this.state.message
                ?
                <div>{this.state.message}</div>
                :
                null
                }  
                <h1>Portfolio {this.renderTotalStocks()}</h1>
                <div>{this.renderStocks()}</div>
                <h2>Balance - {this.state.balance}</h2>
                <form>
                    Stock Ticker
                    <input
                        name="ticker" 
                        type="text" 
                        value={this.state.buy.ticker}
                        onChange={this.handleChange}/>
                    Quantity:
                    <input
                        name="quantity"
                        type="number" 
                        min="1"
                        value={this.state.buy.quantity}
                        onChange={this.handleChange}/>
                    <button type="submit" onClick={this.handleSubmit}>Buy Stocks</button>
                </form>
            </>
        )
    }
}

export default Portfolio