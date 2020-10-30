class Api::V1::VotesController < ApiController
  before_action :authenticate_user

  def create
    review = Review.find(params[:review_id])
    vote_choice = params[:vote_choice]
     
    vote = Vote.find_or_initialize_by(user: current_user, review: review)
    if (vote.vote == nil || vote.vote != vote_choice)
      vote.vote = vote_choice
    else
      vote.vote = :abstain
    end

    if vote.save 
      render json: vote
    else
      render json: {errors: vote.errors.full_messages.to_sentence, reviewId: review.id}
    end
  end

  protected

  def authenticate_user
    if !user_signed_in?
      render json: {errors: "You must be signed in to vote.", reviewId: params[:review_id]}
    end
  end
end
