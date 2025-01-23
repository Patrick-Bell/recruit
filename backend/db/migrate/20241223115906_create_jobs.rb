class CreateJobs < ActiveRecord::Migration[7.2]
  def change
    create_table :jobs do |t|
      t.string :job_title
      t.string :job_type
      t.integer :lower_salary
      t.integer :higher_salary
      t.integer :lower_rate
      t.integer :higher_rate
      t.string :contract_determine
      t.string :job_location
      t.string :job_hybrid
      t.string :job_desc
      t.text :job_skills, array: true, default: []
      t.text :job_benefits, array: true, default: []
      t.boolean :tag
      t.date :job_posted
      t.date :job_close
      t.boolean :active

      t.timestamps
    end
  end
end
