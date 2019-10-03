class UsersController < ApplicationController
    def user_stocks
        user = User.find_by(id: params[:id])
        transactions = user.transactions

        user_transactions = {}

        transactions.each do |transaction|
            if user_transactions[transaction.stock.ticker] == nil
                user_transactions[transaction.stock.ticker] = {"quantity": transaction.quantity, "price": 0}
            else
                user_transactions[transaction.stock.ticker][:quantity] += transaction.quantity
            end
        end
        user_transactions.each_key do |key|
            user_transactions[key][:price] = getStock(key)["Global Quote"]["05. price"]
        end
        render :json => user_transactions
    end

    def buy
        # GET THE USER 
        user = User.find_by(id: 1)
        ticker = params[:ticker]
        quantity = params[:quantity].to_i
        
        price = getStock(ticker)["Global Quote"]["05. price"]
        open_price = getStock(ticker)["Global Quote"]["02. open"]
        stock = Stock.where(ticker: ticker).first_or_create do |stock|
            stock.ticker = ticker
            stock.price = price
            stock.open_price = open_price
        end

        transaction = Transaction.create(action:"buy", quantity: quantity, price: price, user_id: user.id, stock_id: stock.id)

        render :json => transaction

    end
end

# array.each do |item|
#     puts "The current array item is: #{item}"
#   end
