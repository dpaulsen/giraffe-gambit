class Giraffe < ApplicationRecord
  has_many :reviews
  belongs_to :user 

  validates :name, presence: true
  validates :description, presence: true
end