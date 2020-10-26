class GiraffeShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :reviews
end