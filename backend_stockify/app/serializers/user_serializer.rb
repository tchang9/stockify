class UserSerializer < ActiveModel::Serializer
    attributes :id, :first_name, :last_name, :email, :balance
    has_many :transactions
end