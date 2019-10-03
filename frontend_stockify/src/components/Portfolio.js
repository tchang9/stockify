import React from 'react'
import v4 from 'uuid'

class Portfolio extends React.Component {

    state = {
        userStocks: {},
        buy: {
            ticker: "",
            quantity: 0
        }
    }

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
            this.setState({
                userStocks: {...res}
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

    // handleSubmit = () => {
    //     fetch()
    // }

    render() {
        console.log(this.state)
        return (
            <>
                <h1>Portfolio {this.renderTotalStocks()}</h1>
                <div>{this.renderStocks()}</div>
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