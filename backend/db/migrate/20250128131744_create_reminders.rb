class CreateReminders < ActiveRecord::Migration[7.2]
  def change
    create_table :reminders do |t|
      t.string :title
      t.boolean :completed, default: false
      t.date :date

      t.timestamps
    end
  end
end
