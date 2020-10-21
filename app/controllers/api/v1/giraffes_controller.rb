class Api::V1::GiraffesController < ApiController
  def index
    render json: Giraffe.all
  end
end