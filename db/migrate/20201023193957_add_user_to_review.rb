class AddUserToReview < ActiveRecord::Migration[5.2]
  def change
    add_reference :reviews, :user, index: true, null: false 
  end
end
