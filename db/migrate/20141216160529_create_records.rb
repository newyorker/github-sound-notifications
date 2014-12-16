class CreateRecords < ActiveRecord::Migration
  def change
    create_table :records do |t|
      t.text :payload

      t.timestamps
    end
  end
end
