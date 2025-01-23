class AddJobReferenceToApplicants < ActiveRecord::Migration[7.2]
  def change
    add_reference :applicants, :job, null: false, foreign_key: true
  end
end
