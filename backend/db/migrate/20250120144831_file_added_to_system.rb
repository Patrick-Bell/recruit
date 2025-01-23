class FileAddedToSystem < ActiveRecord::Migration[7.2]
  def change
    add_column :candidates, :added_to_system, :boolean, default: false
  end
end
