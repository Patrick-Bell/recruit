class RemoveJobSkillsFromJobs < ActiveRecord::Migration[7.2]
  def change
    remove_column :jobs, :job_skills
    remove_column :jobs, :job_benefits
  end
end
