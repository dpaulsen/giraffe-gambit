require 'rails_helper'

RSpec.describe User, type: :model do

  it { should have_valid(:email).when("user@fake.com")}
  it { should_not have_valid(:email).when(nil)}
 
  it { should have_valid(:username).when("username")}
  it { should_not have_valid(:username).when(nil)}

  it { should have_valid(:password).when("password")}
  it { should_not have_valid(:password).when(nil)}

  describe "#admin?" do
    it "is not an admin if the role is not admin" do
      user = FactoryBot.create(:user, role: :member)
      expect(user.admin?).to eq(false)
    end

    it "is an admin if the role is admin" do
      user = FactoryBot.create(:user, role: :admin)
      expect(user.admin?).to eq(true)
    end
  end

end
