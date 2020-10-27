require "rails_helper"

RSpec.describe Api::V1::GiraffesController, type: :controller do
  let!(:test_user) { FactoryBot.create(:user)}

  let!(:first_giraffe) { FactoryBot.create(:giraffe, name: "Hugo", user: test_user) }
  let!(:second_giraffe) { FactoryBot.create(:giraffe, name: "Penelope", user: test_user) }

  let!(:first_review) { 
    FactoryBot.create(
      :review, 
      comment: "Hugo is awesome!!!", 
      giraffe: first_giraffe, 
      owner: test_user
    ) 
  }

  let!(:second_review) { 
    FactoryBot.create(
      :review, 
      rating: 3,
      comment: nil,
      giraffe: first_giraffe, 
      owner: test_user
    ) 
  }

  describe "GET#index" do
    it "should return a list of all the giraffes" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
    
      expect(returned_json.length).to eq 2
      
      expect(returned_json[0]["name"]).to eq "Hugo"
      expect(returned_json[1]["name"]).to eq "Penelope"
    end
  end

  describe "GET#show" do
    it "should return an individual giraffe with its name, description and reviews" do

      get :show, params: {id: first_giraffe.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 4
      expect(returned_json["name"]).to eq first_giraffe.name
      expect(returned_json["id"]).to eq first_giraffe.id
      expect(returned_json["description"]).to eq first_giraffe.description

      expect(returned_json["reviews"].first["rating"]).to eq 5
      expect(returned_json["reviews"].first["comment"]).to eq "Hugo is awesome!!!"

      expect(returned_json["reviews"].second["rating"]).to eq 3
      expect(returned_json["reviews"].second["comment"]).to eq nil
    end
  end

  describe "POST#create" do
    it "creates a new giraffe" do
      post_json = {
        giraffe: {
          name: "Shelly",
          description: "gnarly giraffe"
        }
      }

      prev_count = Giraffe.count
      post(:create, params: post_json, format: :json)
      expect(Giraffe.count).to eq(prev_count + 1)
    end

    it "returns the json of the newly posted giraffe" do
      post_json = {
        giraffe: {
          name: "Shelly",
          description: "gnarly giraffe"
        }
      }
  
      post(:create, params: post_json, format: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
  
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["giraffe"]["name"]).to eq "Shelly"
      expect(returned_json["giraffe"]["description"]).to eq "gnarly giraffe"
    end

    it "returns errors if the input is not valid" do
      post_json = {
        giraffe: {
          name: "",
          description: ""
        }
      }
  
      post(:create, params: post_json, format: :json)
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
  
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["errors"]).to eq "Name can't be blank and Description can't be blank"
    end
  end
end