class AddCvToApplicant < ActiveRecord::Migration[7.2]
  def change
    add_column :applicants, :cv, :string
  end
end
