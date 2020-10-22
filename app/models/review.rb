class Review < ApplicationRecord
  belongs_to :giraffe

  validates :rating, presence: true, numericality: { less_than_or_equal_to: 5 , greater_than_or_equal_to: 1 }
  validates :giraffe, presence: true
end
