class User < ApplicationRecord
  has_many :giraffes
  has_many :reviews

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :email, presence: true, uniqueness: true 
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
end
