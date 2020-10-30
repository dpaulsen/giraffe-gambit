class Api::V1::GiraffesController < ApiController
  skip_before_action :verify_authenticity_token, :only => :create
  before_action :authenticate_user, except: [:index, :show]

  def index
    render json: Giraffe.all
  end

  def show
    giraffe = Giraffe.find(params[:id])
    render json: giraffe, serializer: GiraffeShowSerializer 
  end

  def create
    giraffe = Giraffe.new(giraffe_params)
    giraffe.user = current_user

    if giraffe.save
      render json: giraffe, serializer: GiraffeShowSerializer 
    else
      render json: { errors: giraffe.errors.full_messages.to_sentence }
    end
  end

  def destroy
    giraffe = Giraffe.find(params[:id])
    giraffe.destroy
    
    render json: giraffe 
  end

  protected

  # def authorize_user
  #   if !user_signed_in? || !(current_user.role == "admin")
  #     render json: {error: ["Only admins have access to this feature"]}
  #   end
  # end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end


  private 

  def giraffe_params
    params.permit(:name, :description, :image)
  end


end