class GiraffeShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image, :userIsOwner, :userIsAdmin

  has_many :reviews do 
    object.reviews.order(created_at: :desc)
  end

  def userIsOwner
    current_user == object.user
  end

  def userIsAdmin
    if current_user.nil?
      false
    else
      current_user.role == "admin"
    end
  end
end
