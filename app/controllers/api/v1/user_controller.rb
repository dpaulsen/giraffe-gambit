class Api::V1::UserController < ApiController

  def role
    render json: current_user
  end

end