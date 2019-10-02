class ChangeBalanceToFloat < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :balance, :float, using: 'balance::float'
  end
end
