require "rails_helper"

RSpec.describe Api::V1::VotesController, type: :controller do
  let!(:user_owner) { FactoryBot.create(:user) }
  let!(:user_writer) { FactoryBot.create(:user) }
  let!(:user_voter) { FactoryBot.create(:user) }

  let!(:first_giraffe) { 
    FactoryBot.create(
      :giraffe, 
      user: user_owner, 
      image: File.open(File.join( Rails.root, 'spec/support/images/testpic.png'))) 
    }

  let!(:first_review) { 
    FactoryBot.create(
      :review, 
      giraffe: first_giraffe, 
      owner: user_writer
    ) 
  }

  describe "POST#create" do
    it "creates a new vote" do
      post_json = {
        review_id: first_review.id,
        vote_choice: "up",
      }

      sign_in user_voter

      prev_count = Vote.count
      post(:create, params: post_json, format: :json)
      expect(Vote.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted vote" do
      post_json = {
        review_id: first_review.id,
        vote_choice: "up",
      }
  
      sign_in user_voter

      post(:create, params: post_json, format: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
  
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      
      expect(returned_json["review"]["id"]).to eq first_review.id
      expect(returned_json["vote"]).to eq "up"
    end

    context "user votes up" do
      it "changes the user's vote if they revote" do
        sign_in user_voter

        post_json = {
          review_id: first_review.id,
          vote_choice: "up",
        }

        prev_count = Vote.count
        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(prev_count + 1)

        post_json = {
          review_id: first_review.id,
          vote_choice: "down",
        }

        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(prev_count + 1)
      end
    end

    context "user votes down" do
      it "changes the user's vote if they revote" do
        sign_in user_voter

        post_json = {
          review_id: first_review.id,
          vote_choice: "down",
        }

        prev_count = Vote.count
        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(prev_count + 1)

        post_json = {
          review_id: first_review.id,
          vote_choice: "up",
        }

        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(prev_count + 1)
      end
    end

    context "user votes up" do
      it "undoes the user's vote if they vote the same twice" do
        sign_in user_voter

        post_json = {
          review_id: first_review.id,
          vote_choice: "up",
        }

        prev_count = Vote.count
        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(prev_count + 1)
        expect(Vote.first.vote).to eq("up")

        post_json = {
          review_id: first_review.id,
          vote_choice: "up",
        }

        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(prev_count + 1)
        expect(Vote.first.vote).to eq("abstain")
      end
    end

    context "user votes down" do
      it "undoes the user's vote if they vote the same twice" do
        sign_in user_voter

        post_json = {
          review_id: first_review.id,
          vote_choice: "down",
        }

        prev_count = Vote.count
        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(prev_count + 1)
        expect(Vote.first.vote).to eq("down")

        post_json = {
          review_id: first_review.id,
          vote_choice: "down",
        }

        post(:create, params: post_json, format: :json)
        expect(Vote.count).to eq(prev_count + 1)
        expect(Vote.first.vote).to eq("abstain")
      end
    end

    it "returns errors if the input is not valid" do
      post_json = {
        review_id: first_review.id,
        vote_choice: "up",
      }

      post(:create, params: post_json, format: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
  
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["errors"]).to eq "You must be signed in to vote."
    end
  end
end