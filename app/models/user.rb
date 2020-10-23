class User < ApplicationRecord
  has_many :reviews
  has_many :giraffes 
  
  enum role: [:member , :admin ]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :member
  end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :email, presence: true, uniqueness: true 
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
end
