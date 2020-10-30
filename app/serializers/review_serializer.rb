class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :userIsOwner, :voteCount, :myVote, :ownerName, :userIsAdmin

  def userIsOwner
    current_user == object.owner
  end

  def ownerName
    object.owner.username
  end

  def userIsAdmin
    if current_user.nil?
      false
    else
      current_user.role == "admin"
    end
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
