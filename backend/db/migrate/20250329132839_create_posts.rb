class CreatePosts < ActiveRecord::Migration[7.2]
  def change
    create_table :posts do |t|
      t.string :ingestion_amount
      t.string :integer
      t.string :comment

      t.timestamps
    end
    add_reference :users, :medicine, foreign_key: true
    add_reference :posts, :medicine, foreign_key: true
  end
end
