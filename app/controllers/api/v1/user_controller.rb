class Api::V1::UserController < ApiController

  def role
    render json: current_user, serializer: TacoUserSerializer
  end

end