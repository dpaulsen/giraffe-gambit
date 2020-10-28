class AddImageToGiraffes < ActiveRecord::Migration[5.2]
  def change
    add_column :giraffes, :image, :string, null: false  
  end
end
