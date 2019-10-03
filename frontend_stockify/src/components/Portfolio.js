import React from 'react'
import v4 from 'uuid'

class Portfolio extends React.Component {

    state = {
        balance: 0,
        userStocks: {},
        buy: {
            ticker: "",
            quantity: 0
        }
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
            this.setState({
                userStocks: {...res.transactions},
                balance: res.balance
            })
        })
    }

    renderStocks = () => {
        return Object.keys(this.state.userStocks).map(ticker => {
            return (
                <div key={ v4() }>{ticker} - {this.state.userStocks[ticker].quantity}</div>
            )
        })
    }

    renderTotalStocks = () => {
        let total = 0
        for (const ticker in this.state.userStocks) {
            total += this.state.userStocks[ticker].quantity * this.state.userStocks[ticker].price
        }
        return total
    }

    handleChange = (e) => {
        this.setState({
            buy: {...this.state.buy, [e.target.name]: e.target.value}
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
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
                console.log(res.message)
            } else {
                console.log(res)
                const newStockTotal = this.state.userStocks[res.stock_ticker].quantity + res.quantity
                this.setState({
                    userStocks: {...this.state.userStocks,
                        [res.stock_ticker]: {
                            ...this.state.userStocks[res.stock_ticker],
                                quantity: newStockTotal
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