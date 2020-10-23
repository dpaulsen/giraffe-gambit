class GiraffeShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :description
  has_many :reviews   # make serializer, and controller from other branch
end