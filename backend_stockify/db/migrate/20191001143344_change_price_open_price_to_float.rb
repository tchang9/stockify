class ChangePriceOpenPriceToFloat < ActiveRecord::Migration[5.2]
  def change
    change_column :stocks, :price, :integer, using: 'price::integer'
    change_column :stocks, :open_price, :integer, using: 'open_price::integer'
  end
end
