class AddStageToApplicant < ActiveRecord::Migration[7.2]
  def change
    add_column :applicants, :stage, :string, default: 'applied'
  end
end
