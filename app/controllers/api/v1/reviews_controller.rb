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

  private 

  def review_params
    params.require(:review).permit(:rating, :comment)
  end
end