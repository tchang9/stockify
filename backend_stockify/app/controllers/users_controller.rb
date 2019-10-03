class UsersController < ApplicationController
    def user_stocks
        user = User.find_by(id: params[:id])
        transactions = user.transactions
        status = true

        user_transactions = {}

        transactions.each do |transaction|
            if user_transactions[transaction.stock.ticker] == nil
                user_transactions[transaction.stock.ticker] = {"quantity": transaction.quantity, "price": 0}
            else
                user_transactions[transaction.stock.ticker][:quantity] += transaction.quantity
            end
        end

        user_transactions.each_key do |key|
            stock_info = getStock(key)
            if stock_info == nil
                status = false
                break
            else
                user_transactions[key][:price] = stock_info["Global Quote"]["05. price"].to_f
                user_transactions[key][:open_price] = stock_info["Global Quote"]["02. open"].to_f
            end
        end

        if status
            user_info = {balance: user.balance, transactions: user_transactions}
            render :json => user_info
        else
            render json: {message: "Too many requests"}
        end
    end

    def buy
        user = curr_user
        ticker = params[:ticker].upcase
        quantity = params[:quantity].to_i
        stock_info = getStock(ticker)

        if stock_info == nil
            render json: {message: "Too many requests or Invalid Ticker"}
        else
            price = stock_info["Global Quote"]["05. price"].to_f
            open_price = stock_info["Global Quote"]["02. open"]
            stock = Stock.where(ticker: ticker).first_or_create do |stock|
                stock.ticker = ticker
                stock.price = price
                stock.open_price = open_price
            end
    
            cost = price.to_f * quantity.to_f
            if cost > user.balance
                render json: {message: "Not Enough Funds"}
            else
                user.update(balance: user.balance-cost)
    
                transaction = Transaction.create(action:"buy", quantity: quantity, price: price, user_id: user.id, stock_id: stock.id)
    
                render :json => transaction
            end
        end
    end

    def transactions
        user = curr_user
        transactions = user.transactions

        render :json => transactions
    end

    def create
        user = User.new(
            first_name: params[:firstName],
            last_name: params[:lastName],
            email: params[:email],
            password_digest: params[:password]
        )
        if user.save
            render :json => user
        else
            render json: {errors: user.errors.full_messages}
        end
    end
end
