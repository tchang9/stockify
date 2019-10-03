class TransactionSerializer < ActiveModel::Serializer
    attributes :action, :quantity, :price
    belongs_to :user
    belongs_to :stock
end