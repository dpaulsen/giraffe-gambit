class Api::V1::GiraffesController < ApiController
  def index
    render json: Giraffe.all
  end

  def show
    giraffe = Giraffe.find(params[:id])
    render json: giraffe, serializer: GiraffeShowSerializer 
  end
end