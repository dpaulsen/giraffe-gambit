class Api::V1::GiraffesController < ApiController
  def index
    render json: Giraffe.all
  end

  def show
    giraffe = Giraffe.find(params[:id])
    render json: giraffe, serializer: GiraffeShowSerializer 
  end

  def create
    giraffe = Giraffe.new(giraffe_params)

    if giraffe.save
      render json: { giraffe: giraffe }
    else
      render json: { errors: giraffe.errors.full_messages.to_sentence }
    end
  end

  private 

  def giraffe_params
    params.require(:giraffe).permit(:name, :description, :giraffe_photo)
  end
end