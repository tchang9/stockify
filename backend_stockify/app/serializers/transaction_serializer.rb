class TransactionSerializer < ActiveModel::Serializer
    attributes :action, :quantity, :price, :stock_ticker
    belongs_to :user
    belongs_to :stock

    def stock_ticker 
        object.stock.ticker
    end
end
