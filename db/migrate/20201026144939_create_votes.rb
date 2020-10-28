class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.belongs_to :user, null: false
      t.belongs_to :review, null: false
      t.index [:user_id, :review_id], unique: true

      t.integer :vote, null: false

      t.timestamps
    end
  end
end