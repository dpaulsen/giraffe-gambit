class CreateGiraffes < ActiveRecord::Migration[5.2]
  def change
    create_table :giraffes do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.belongs_to :user, null: false 

      t.timestamps
    end
  end
end
