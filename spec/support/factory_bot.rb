require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    sequence(:username)  { |n| "testusername#{n}" }
  end

  factory :giraffe do
    name { 'name' }
    description { 'description' }
  end

  factory :review do
    rating { 5 }
    comment { 'this is a comment' }
  end
end
