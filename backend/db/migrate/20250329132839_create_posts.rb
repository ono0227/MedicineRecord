class CreatePosts < ActiveRecord::Migration[7.2]
  def change
    create_table :posts do |t|
      t.integer :ingestion_amount
      t.string :comment
      t.references :user, foreign_key: true
      t.references :medicine, foreign_key: true

      t.timestamps
    end
  end
end
