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
end
