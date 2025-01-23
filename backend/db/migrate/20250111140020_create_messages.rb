class CreateMessages < ActiveRecord::Migration[7.2]
  def change
    create_table :messages do |t|
      t.string :name
      t.string :email
      t.string :message
      t.boolean :responded, default: false

      t.timestamps
    end
  end
end
