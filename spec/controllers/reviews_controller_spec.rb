require "rails_helper"

RSpec.describe Api::V1::ReviewsController, type: :controller do
  let!(:test_user) { FactoryBot.create(:user) }

  let!(:first_giraffe) { FactoryBot.create(:giraffe, user: test_user) }

  describe "POST#create" do
    it "creates a new review" do
      post_json = {
        review: {
          rating: 2,
          comment: "" 
        },
        giraffe_id: first_giraffe.id
      }

      sign_in test_user

      prev_count = Review.count
      post(:create, params: post_json, format: :json)
      expect(Review.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted review" do
      post_json = {
        review: {
          rating: 2,
          comment: "test comment" 
        },
        giraffe_id: first_giraffe.id
      }
  
      sign_in test_user

      post(:create, params: post_json, format: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
  
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      
      expect(returned_json["rating"]).to eq 2
      expect(returned_json["comment"]).to eq "test comment"
    end

    it "returns errors if the input is not valid" do
      post_json = {
        review: {
          rating: "",
          comment: "test comment" 
        },
        giraffe_id: first_giraffe.id
      }
  
      sign_in test_user

      post(:create, params: post_json, format: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
  
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["errors"]).to eq "Rating is not a number"
    end
  end
end