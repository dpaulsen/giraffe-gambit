class Api::V1::UserController < ApiController

  def role
    unless current_user.nil?
      render json: current_user, serializer: CustomUserSerializer
    else
      render json: nil
    end
  end
end
