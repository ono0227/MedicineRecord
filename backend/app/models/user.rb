class User < ApplicationRecord
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable
  
  include DeviseTokenAuth::Concerns::User

  mount_uploader :image, ImageUploader
end
