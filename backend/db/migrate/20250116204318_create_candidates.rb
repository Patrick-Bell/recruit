class CreateCandidates < ActiveRecord::Migration[7.2]
  def change
    create_table :candidates do |t|
      t.string :name
      t.string :email
      t.string :message

      t.timestamps
    end
  end
end
