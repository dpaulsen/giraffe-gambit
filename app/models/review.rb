class Review < ApplicationRecord
  belongs_to :giraffe
  belongs_to :owner, class_name: "User", foreign_key: "user_id"

  has_many :votes
  has_many :voters, through: :votes,  source: :user

  validates :rating, numericality:{ less_than_or_equal_to: 5 , 
                                    greater_than_or_equal_to: 1 }
  validates :giraffe, presence: true
end
