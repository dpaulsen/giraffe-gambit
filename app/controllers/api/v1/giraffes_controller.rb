class Api::V1::GiraffesController < ApiController
  def index
    render json: Giraffe.all
  end

  def show
    giraffe = Giraffe.find(params[:id])
    render json: giraffe, serializer: GiraffeShowSerializer 
  end

  def create
    # binding.pry
    giraffe = Giraffe.new(giraffe_params)
    giraffe.user = current_user

    if giraffe.save
      render json: giraffe, serializer: GiraffeShowSerializer 
    else
      render json: { errors: giraffe.errors.full_messages.to_sentence }
    end
  end

  private 

  def giraffe_params
    params.permit(:name, :description, :image)
  end
end