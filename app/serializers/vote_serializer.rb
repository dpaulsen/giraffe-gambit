class VoteSerializer < ActiveModel::Serializer
  attributes :vote
  belongs_to :review
end
