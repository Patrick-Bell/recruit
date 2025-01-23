class AddArrayToFields < ActiveRecord::Migration[7.2]
  def change
    change_column :jobs, :job_skills, :text, array: true, default: [], using: 'job_skills::text[]'
    change_column :jobs, :job_benefits, :text, array: true, default: [], using: 'job_benefits::text[]'
  end
end
