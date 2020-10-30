class GiraffeShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image
  
  has_many :reviews do 
    object.reviews.order(created_at: :desc)
  end
end