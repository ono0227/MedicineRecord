class CreateMedicines < ActiveRecord::Migration[7.2]
  def change
    create_table :medicines do |t|
      t.string :name
      t.string :medicine_image
      t.string :memo
      t.integer :ingestion_times_per_day
      t.integer :ingestion_amount_per_day

      t.timestamps
    end
    add_reference :users, :medicine, foreign_key: true
    add_reference :categories, :medicine, foreign_key: true
  end
end
