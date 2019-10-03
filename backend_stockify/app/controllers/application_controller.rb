require 'net/http'
class ApplicationController < ActionController::API
    def getStock(ticker)
        stock_api_url = URI.parse("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=#{ticker}&apikey=LEQZN4AR3VUUZHLU")
        stock_info = Net::HTTP.get_response(stock_api_url).body
        return JSON.parse(stock_info)
    end
end
