require "rails_helper"

RSpec.describe Api::V1::GiraffesController, type: :controller do
  let!(:first_giraffe) { Giraffe.create(
    name: "Hugo",
    description: "this big guy loves to eat leaves"
  ) }
  let!(:second_giraffe) { Giraffe.create(
    name: "Penelope",
    description: "this little gal loves to run"
  ) }

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
    it "should return an individual giraffe with it's name and description" do

      get :show, params: {id: first_giraffe.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
      expect(returned_json["name"]).to eq first_giraffe.name
      expect(returned_json["id"]).to eq first_giraffe.id
      expect(returned_json["description"]).to eq first_giraffe.description
    end
  end
end