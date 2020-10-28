class Vote < ApplicationRecord
    belongs_to :user
    belongs_to :review

    enum vote: { down: -1, abstain: 0, up: 1}
    
    validates :user, presence: true
    validates :review, presence: true
    validates :vote, presence: true

    validates :user, uniqueness: {scope: :review} 
end
