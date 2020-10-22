class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.integer :rating, null: false
      t.text :comment
      t.belongs_to :giraffe, null: false

      t.timestamps
    end
  end
end
