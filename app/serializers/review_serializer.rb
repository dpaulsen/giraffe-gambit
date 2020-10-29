class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :userIsOwner, :voteCount, :myVote

  def userIsOwner
    current_user == object.owner
  end

  def voteCount
    up_votes = object.votes.where(vote: :up).count
    down_votes = object.votes.where(vote: :down).count
    up_votes - down_votes
  end

  def myVote
    object.votes.where(user: current_user).first
  end
end