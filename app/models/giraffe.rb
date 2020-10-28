class Giraffe < ApplicationRecord
  has_many :reviews

  validates :name, presence: true
  validates :description, presence: true
  validates :image, presence: true 

  mount_uploader :image, GiraffeImageUploader
end