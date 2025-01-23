class ChangeJobDescFromStringToArray < ActiveRecord::Migration[7.2]
  def change
    remove_column :jobs, :job_desc
    add_column :jobs, :job_desc, :text, array: true, default: []
  end
end
