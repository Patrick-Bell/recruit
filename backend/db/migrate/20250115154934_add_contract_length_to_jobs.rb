class AddContractLengthToJobs < ActiveRecord::Migration[7.2]
  def change
    add_column :jobs, :contract_length, :string
  end
end
