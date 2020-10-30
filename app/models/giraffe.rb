class Giraffe < ApplicationRecord
  has_many :reviews, dependent: :destroy
  belongs_to :user 

  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true

  mount_uploader :image, GiraffeImageUploader
end