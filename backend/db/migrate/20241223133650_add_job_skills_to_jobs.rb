class AddJobSkillsToJobs < ActiveRecord::Migration[7.2]
  def change
    add_column :jobs, :job_skills, :text, array: true, default: []
  end
end
