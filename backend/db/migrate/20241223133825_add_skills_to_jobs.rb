class AddSkillsToJobs < ActiveRecord::Migration[7.2]
  def change
    add_column :jobs, :job_benefits, :text, array: true, default: []
  end
end
