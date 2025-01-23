class ChangeFieldsToCandidate < ActiveRecord::Migration[7.2]
  def change
    remove_column :candidates, :message
    add_column :candidates, :phone, :string
  end
end
