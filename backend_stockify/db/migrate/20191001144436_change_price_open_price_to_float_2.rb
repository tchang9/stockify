class ChangePriceOpenPriceToFloat2 < ActiveRecord::Migration[5.2]
  def change
    change_column :stocks, :price, :float, using: 'price::float'
    change_column :stocks, :open_price, :float, using: 'open_price::float'
  end
end
