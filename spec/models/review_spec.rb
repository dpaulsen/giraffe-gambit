require 'rails_helper'

RSpec.describe Review, type: :model do

  it { should belong_to :giraffe }

  it { should have_valid(:rating).when(5, 1)}
  it { should_not have_valid(:rating).when(nil, -1, 6, "string")}
end