class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :userIsOwner, :voteCount

  def userIsOwner
    current_user == object.owner
  end

  def voteCount
    up_votes = object.votes.where(vote: :up).count
    down_votes = object.votes.where(vote: :down).count
    up_votes - down_votes
  end
end