class User < ApplicationRecord
  has_secure_password
  has_many :notes

  validates :email, :password, :password_confirmation, presence: true
  validates :email, uniqueness: true
end
