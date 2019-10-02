class ChangeTypeToAction < ActiveRecord::Migration[5.2]
  def change
    rename_column :transactions, :type, :action
  end
end
