require 'net/http'
class ApplicationController < ActionController::API
    def getStock(ticker)
        begin
            stock_api_url = URI.parse("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=#{ticker}&apikey=LEQZN4AR3VUUZHLU")
            stock_info = Net::HTTP.get_response(stock_api_url).body
            puts JSON.parse(stock_info)
            if JSON.parse(stock_info)["Note"]
                return nil
            else
                return JSON.parse(stock_info)
            end
        rescue
            nil
        end
    end

    def get_token
        request.headers["Authorization"]
    end

    def curr_user
        User.find_by(id: get_token)
    end
end
