class CreateMedicines < ActiveRecord::Migration[7.2]
  def change
    create_table :medicines do |t|
      t.string :name
      t.string :medicine_image
      t.string :memo
      t.string :unit
      t.integer :ingestion_times_per_day
      t.integer :ingestion_amount_every_time
      t.references :user, foreign_key: true
      t.references :category, foreign_key: true

      t.timestamps
    end
  end
end
