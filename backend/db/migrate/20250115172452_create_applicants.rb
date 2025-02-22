class CreateApplicants < ActiveRecord::Migration[7.2]
  def change
    create_table :applicants do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone_number
      t.string :location
      t.string :availability
      t.string :profile
      t.string :cover_letter

      t.timestamps
    end
  end
end
