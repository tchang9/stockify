import React from 'react'
import v4 from 'uuid'
import Nav from './Nav'

class Portfolio extends React.Component {

    state = {
        balance: null,
        userStocks: {},
        buy: {
            ticker: "",
            quantity: 0
        },
        message: ""
    }

    componentDidMount() {
        const userId = localStorage.getItem("token")
        fetch(`https://git.heroku.com/stockify-api.git
        /userstocks`, {
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
                    balance: res.balance.toFixed(2)
                })
            }
        })
    }

    renderStocks = () => {
        return Object.keys(this.state.userStocks).map(ticker => {
            const quantity = this.state.userStocks[ticker].quantity
            const price = parseFloat(this.state.userStocks[ticker].price).toFixed(2)
            const openPrice = parseFloat(this.state.userStocks[ticker].open_price).toFixed(2)
            let color = "gray"
                if (price < openPrice) {
                    color = "red"
                } else if (price > openPrice) {
                    color = "green"
                }

            return (

                <div key={ v4() }><font color={color}>{ticker}</font> - {quantity} Shares ${(price * quantity).toFixed(2)}</div>
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
        fetch(`https://git.heroku.com/stockify-api.git
        /buy`, {
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
                                price: res.price,
                                open_price: res.stock.open_price
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
                <div className="error">{this.state.message}</div>
                :
                null
                }
                {this.state.balance === null && this.state.message === "" ? "Fetching Data.." :
                    <div className="portfolio">
                        <div>   
                            <h1>Portfolio (${this.renderTotalStocks()})</h1>
                            <div>{this.renderStocks()}</div>
                        </div>
                        <div className="buyStock">
                            <h2>Balance - ${this.state.balance}</h2>
                            <form>
                                Stock Ticker: 
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
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default Portfolio