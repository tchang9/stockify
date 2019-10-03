class User < ApplicationRecord
    has_many :transactions
    has_many :stocks, through: :transactions

    validates :email, uniqueness: true, presence: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :password_digest, presence: true

end
