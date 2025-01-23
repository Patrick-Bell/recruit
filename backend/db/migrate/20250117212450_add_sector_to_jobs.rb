class AddSectorToJobs < ActiveRecord::Migration[7.2]
  def change
    add_column :jobs, :industry, :string
  end
end
