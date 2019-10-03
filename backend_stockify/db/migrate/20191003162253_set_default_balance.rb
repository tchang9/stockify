class SetDefaultBalance < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :balance, :float, default: 5000
  end
end
