class Api::V1::ReviewsController < ApiController

  def create
    review = Review.new(review_params)
    giraffe = Giraffe.find(params[:giraffe_id])
    review.giraffe = giraffe
    review.owner = current_user

    if review.save
      render json: review
    else
      render json: { errors: review.errors.full_messages.to_sentence }
    end
  end

  def update  

    review = Review.find(params[:id])
    review_attributes = { rating: params[:review][:rating], comment: params[:review][:comment]}

    
    review.update_attributes(review_attributes)
    render json: review

    # authorization error...

  end

  def destroy

    review = Review.find(params[:id])
    review.destroy
    
    render json: review

    #authorization errors...

  end

  private 

  def review_params
    params.require(:review).permit(:rating, :comment)
  end
end
