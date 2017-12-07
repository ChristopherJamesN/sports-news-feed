class User < ApplicationRecord
  has_secure_password
  has_many :notes

  validates :email, presence: true
  validates :email, uniqueness: true
end
