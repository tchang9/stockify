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
end

# array.each do |item|
#     puts "The current array item is: #{item}"
#   end